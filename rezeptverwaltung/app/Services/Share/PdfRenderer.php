<?php

namespace App\Services\Share;

use Dompdf\Dompdf;
use Dompdf\Options;

/**
 * PDF-Erzeugung mit dompdf (reines PHP, kein Headless-Browser).
 * Schrift: DejaVu Sans (in dompdf enthalten) für korrekte Umlaute und Sonderzeichen.
 * Externe Ressourcen sind deaktiviert; Bilder werden nur aus dem privaten Speicher
 * (chroot) gelesen. Temporäre Dateien liegen geschützt in storage/app/private/tmp/dompdf.
 */
class PdfRenderer
{
    public function render(string $html): string
    {
        $tmp = storage_path('app/private/tmp/dompdf');
        $fontCache = storage_path('app/private/dompdf-fonts');
        foreach ([$tmp, $fontCache] as $dir) {
            if (! is_dir($dir)) {
                @mkdir($dir, 0750, true);
            }
        }
        $options = new Options;
        $options->set('defaultFont', 'DejaVu Sans');
        $options->set('isRemoteEnabled', false);
        $options->set('isPhpEnabled', false);
        $options->set('isJavascriptEnabled', false);
        $options->set('isHtml5ParserEnabled', true);
        $options->set('tempDir', $tmp);
        $options->set('fontCache', $fontCache);
        $options->set('chroot', [storage_path('app/private'), base_path('vendor/dompdf/dompdf/lib')]);
        $options->set('dpi', 96);

        $dompdf = new Dompdf($options);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->loadHtml($html, 'UTF-8');
        $dompdf->render();
        // Seitenzahlen
        $canvas = $dompdf->getCanvas();
        $font = $dompdf->getFontMetrics()->getFont('DejaVu Sans');
        $canvas->page_text($canvas->get_width() - 110, $canvas->get_height() - 28, 'Seite {PAGE_NUM} von {PAGE_COUNT}', $font, 8, [0.4, 0.4, 0.4]);

        return (string) $dompdf->output();
    }

    public static function filename(string $title, string $suffix = ''): string
    {
        $map = ['ä' => 'ae', 'ö' => 'oe', 'ü' => 'ue', 'Ä' => 'Ae', 'Ö' => 'Oe', 'Ü' => 'Ue', 'ß' => 'ss'];
        $s = strtr($title, $map);
        $s = preg_replace('/[^A-Za-z0-9]+/', '-', $s) ?? 'rezept';
        $s = trim($s, '-') ?: 'rezept';

        return mb_substr($s, 0, 80).$suffix.'.pdf';
    }
}
