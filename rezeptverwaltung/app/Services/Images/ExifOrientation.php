<?php

namespace App\Services\Images;

/**
 * Liest die EXIF-Ausrichtung eines JPEGs. Nutzt ext-exif, falls vorhanden,
 * sonst einen kleinen eigenen Parser (ext-exif ist auf Shared Hosting nicht immer aktiv).
 */
final class ExifOrientation
{
    public static function read(string $path): int
    {
        if (function_exists('exif_read_data')) {
            $data = @exif_read_data($path, 'IFD0');
            if (is_array($data) && isset($data['Orientation'])) {
                return (int) $data['Orientation'];
            }

            return 1;
        }

        return self::parse($path);
    }

    public static function parse(string $path): int
    {
        $fh = @fopen($path, 'rb');
        if (! $fh) {
            return 1;
        }
        try {
            $data = fread($fh, 128 * 1024) ?: '';
        } finally {
            fclose($fh);
        }
        if (substr($data, 0, 2) !== "\xFF\xD8") {
            return 1;
        }
        $pos = 2;
        $len = strlen($data);
        while ($pos + 4 <= $len) {
            if ($data[$pos] !== "\xFF") {
                return 1;
            }
            $marker = ord($data[$pos + 1]);
            $segLen = unpack('n', substr($data, $pos + 2, 2))[1];
            if ($marker === 0xE1 && substr($data, $pos + 4, 6) === "Exif\0\0") {
                return self::fromTiff(substr($data, $pos + 10, $segLen - 8));
            }
            if ($marker === 0xDA) {
                return 1;
            }
            $pos += 2 + $segLen;
        }

        return 1;
    }

    private static function fromTiff(string $tiff): int
    {
        if (strlen($tiff) < 8) {
            return 1;
        }
        $le = substr($tiff, 0, 2) === 'II';
        $u16 = fn (int $o) => $o + 2 <= strlen($tiff) ? unpack($le ? 'v' : 'n', substr($tiff, $o, 2))[1] : 0;
        $u32 = fn (int $o) => $o + 4 <= strlen($tiff) ? unpack($le ? 'V' : 'N', substr($tiff, $o, 4))[1] : 0;
        $ifd = $u32(4);
        $count = $u16($ifd);
        for ($i = 0; $i < $count && $i < 200; $i++) {
            $entry = $ifd + 2 + $i * 12;
            if ($u16($entry) === 0x0112) {
                $v = $u16($entry + 8);

                return ($v >= 1 && $v <= 8) ? $v : 1;
            }
        }

        return 1;
    }
}
