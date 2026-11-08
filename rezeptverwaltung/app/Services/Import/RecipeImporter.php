<?php

namespace App\Services\Import;

use App\Models\Recipe;
use App\Services\Http\FetchException;
use App\Services\Http\SafeHttpClient;
use App\Services\Images\ImageException;
use App\Services\Images\ImageService;
use App\Services\Images\PendingUpload;

/**
 * Importiert ein Rezept von einer Webseite als ENTWURF (es wird nichts gespeichert).
 */
class RecipeImporter
{
    public function __construct(
        private readonly SafeHttpClient $http,
        private readonly RecipeExtractor $extractor,
        private readonly SchemaRecipeMapper $mapper,
        private readonly ImageService $images,
    ) {}

    /**
     * @return array<int, array<string, mixed>> Entwürfe (mehrere, falls die Seite mehrere Rezepte enthält)
     *
     * @throws ImportException
     */
    public function fromUrl(string $url): array
    {
        $url = trim($url);
        try {
            $response = $this->http->get($url);
        } catch (FetchException $e) {
            throw new ImportException($e->getMessage(), 0, $e);
        }
        $ct = $response['content_type'];
        if ($ct !== '' && ! str_contains($ct, 'html') && ! str_contains($ct, 'xml')) {
            throw new ImportException('Die Adresse liefert keine Webseite, sondern „'.strtok($ct, ';').'“. Bitte die Adresse der Rezeptseite angeben.');
        }
        $html = $this->toUtf8($response['body'], $ct);
        $schemaRecipes = $this->extractor->extract($html);
        if ($schemaRecipes === []) {
            throw new ImportException(
                'Auf dieser Seite wurden keine strukturierten Rezeptdaten (Schema.org) gefunden. '
                .'Die Seite wird daher nicht unterstützt. Sie können den Rezepttext stattdessen kopieren und unter „Text einfügen“ übernehmen.'
            );
        }

        $drafts = [];
        foreach (array_slice($schemaRecipes, 0, 20) as $r) {
            $draft = $this->mapper->map($r, $response['url']);
            if ($response['url'] !== $url) {
                $draft['source_url'] = $response['url'];
            }
            $drafts[] = $draft;
        }

        return $drafts;
    }

    /** Ergänzt Dublettenhinweise anhand der Quell-URL. */
    public function duplicatesFor(?string $sourceUrl, int $userId): array
    {
        if (! $sourceUrl) {
            return [];
        }

        return Recipe::query()->where('user_id', $userId)->where('source_url_hash', Recipe::hashSourceUrl($sourceUrl))
            ->get(['id', 'title', 'created_at'])->all();
    }

    /**
     * Lädt das Bild eines Entwurfs (falls zulässig und technisch möglich) in den Zwischenspeicher.
     *
     * @return array{token: string|null, error: string|null}
     */
    public function fetchImage(?string $imageUrl): array
    {
        if (! $imageUrl) {
            return ['token' => null, 'error' => null];
        }
        $dir = storage_path('app/private/tmp/import');
        if (! is_dir($dir)) {
            @mkdir($dir, 0750, true);
        }
        $tmp = tempnam($dir, 'rzimg');
        try {
            $res = $this->http->get($imageUrl, config('rezepte.images.max_mb') * 1024 * 1024, 'image/avif,image/webp,image/png,image/jpeg,*/*;q=0.5');
            file_put_contents($tmp, $res['body']);
            unset($res);
            $this->images->inspect($tmp);
            $token = PendingUpload::stash($tmp, basename(parse_url($imageUrl, PHP_URL_PATH) ?: 'bild'), $imageUrl, true);

            return ['token' => $token, 'error' => null];
        } catch (FetchException|ImageException $e) {
            return ['token' => null, 'error' => 'Das Bild der Quelle konnte nicht übernommen werden: '.$e->getMessage()];
        } finally {
            if (is_file($tmp)) {
                @unlink($tmp);
            }
        }
    }

    private function toUtf8(string $html, string $contentType): string
    {
        $charset = null;
        if (preg_match('/charset=([\w-]+)/i', $contentType, $m)) {
            $charset = $m[1];
        } elseif (preg_match('/<meta[^>]+charset=["\']?([\w-]+)/i', substr($html, 0, 4096), $m)) {
            $charset = $m[1];
        }
        if ($charset && strtolower($charset) !== 'utf-8' && strtolower($charset) !== 'utf8') {
            $converted = @mb_convert_encoding($html, 'UTF-8', $charset);
            if (is_string($converted)) {
                return $converted;
            }
        }
        if (! mb_check_encoding($html, 'UTF-8')) {
            return mb_convert_encoding($html, 'UTF-8', 'Windows-1252');
        }

        return $html;
    }
}
