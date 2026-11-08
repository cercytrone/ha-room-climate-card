<?php

namespace App\Services\Backup;

use Illuminate\Support\Facades\DB;

/**
 * Reine PHP-Datenbanksicherung (kein mysqldump erforderlich).
 * Format: gzip-komprimiertes SQL, genau eine Anweisung pro Zeile.
 */
class DatabaseDumper
{
    public function dump(string $gzPath): array
    {
        $pdo = DB::connection()->getPdo();
        $skip = config('rezepte.backup.skip_data', []);
        $fh = gzopen($gzPath, 'wb6');
        if (! $fh) {
            throw new \RuntimeException('Sicherungsdatei konnte nicht angelegt werden: '.$gzPath);
        }
        $counts = [];
        try {
            gzwrite($fh, "-- Rezeptverwaltung Datenbanksicherung\n-- Erstellt: ".now()->toIso8601String()."\n");
            gzwrite($fh, "SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS=0;\n");
            foreach ($this->tables() as $table) {
                $qt = '`'.str_replace('`', '``', $table).'`';
                $create = DB::selectOne('SHOW CREATE TABLE '.$qt);
                $createSql = (array) $create;
                $sql = $createSql['Create Table'] ?? array_values($createSql)[1];
                gzwrite($fh, 'DROP TABLE IF EXISTS '.$qt.";\n");
                gzwrite($fh, str_replace(["\r", "\n"], ' ', $sql).";\n");
                $counts[$table] = 0;
                if (in_array($table, $skip, true)) {
                    continue;
                }
                $pdo->setAttribute(\PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
                try {
                    $stmt = $pdo->query('SELECT * FROM '.$qt);
                    $batch = [];
                    $columns = null;
                    while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                        $columns ??= '('.implode(',', array_map(fn ($c) => '`'.str_replace('`', '``', $c).'`', array_keys($row))).')';
                        $batch[] = '('.implode(',', array_map(fn ($v) => $v === null ? 'NULL' : $pdo->quote((string) $v), $row)).')';
                        $counts[$table]++;
                        if (count($batch) >= 200) {
                            gzwrite($fh, 'INSERT INTO '.$qt.' '.$columns.' VALUES '.implode(',', $batch).";\n");
                            $batch = [];
                        }
                    }
                    if ($batch) {
                        gzwrite($fh, 'INSERT INTO '.$qt.' '.$columns.' VALUES '.implode(',', $batch).";\n");
                    }
                    $stmt->closeCursor();
                } finally {
                    $pdo->setAttribute(\PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
                }
            }
            gzwrite($fh, "SET FOREIGN_KEY_CHECKS=1;\n");
        } finally {
            gzclose($fh);
        }

        return $counts;
    }

    /** Spielt eine mit dump() erzeugte Sicherung ein. */
    public function restore(string $gzPath): int
    {
        $pdo = DB::connection()->getPdo();
        $fh = gzopen($gzPath, 'rb');
        if (! $fh) {
            throw new \RuntimeException('Sicherungsdatei konnte nicht gelesen werden.');
        }
        $count = 0;
        try {
            $pdo->exec('SET FOREIGN_KEY_CHECKS=0');
            $statement = '';
            while (($line = gzgets($fh)) !== false) {
                if ($statement === '' && (str_starts_with($line, '--') || trim($line) === '')) {
                    continue;
                }
                $statement .= $line;
                if (str_ends_with(rtrim($line, "\r\n"), ';')) {
                    $pdo->exec(rtrim(trim($statement), ';'));
                    $statement = '';
                    $count++;
                }
            }
        } finally {
            $pdo->exec('SET FOREIGN_KEY_CHECKS=1');
            gzclose($fh);
        }

        return $count;
    }

    /** @return array<int, string> */
    public function tables(): array
    {
        $rows = DB::select("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");

        return array_map(fn ($r) => array_values((array) $r)[0], $rows);
    }
}
