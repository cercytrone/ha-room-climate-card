<?php

namespace App\Support;

use League\CommonMark\Environment\Environment;
use League\CommonMark\Event\DocumentParsedEvent;
use League\CommonMark\Extension\Autolink\AutolinkExtension;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\CommonMark\Node\Inline\Image;
use League\CommonMark\Extension\DisallowedRawHtml\DisallowedRawHtmlExtension;
use League\CommonMark\Extension\ExternalLink\ExternalLinkExtension;
use League\CommonMark\Extension\Strikethrough\StrikethroughExtension;
use League\CommonMark\MarkdownConverter;
use League\CommonMark\Node\Inline\Text;

/**
 * Sichere Markdown-Darstellung: Roh-HTML wird maskiert, unsichere Links
 * (javascript:, data:, vbscript:) werden entfernt, externe Links erhalten
 * rel="noopener noreferrer nofollow". Bilder aus Markdown werden nicht geladen
 * (keine Fremdanfragen/Tracking), sondern als Text dargestellt.
 */
final class Markdown
{
    private static ?MarkdownConverter $converter = null;

    public static function toHtml(?string $markdown): string
    {
        if ($markdown === null || trim($markdown) === '') {
            return '';
        }

        return (string) self::converter()->convert($markdown);
    }

    /** Markdown in einfachen Text (für Teilen als Text). */
    public static function toPlainText(?string $markdown): string
    {
        if ($markdown === null) {
            return '';
        }
        $t = $markdown;
        $t = preg_replace('/^#{1,6}\s*/m', '', $t) ?? $t;
        $t = preg_replace('/\[([^\]]+)\]\(([^)\s]+)\)/u', '$1 ($2)', $t) ?? $t;
        $t = preg_replace('/(\*\*|__)(.+?)\1/u', '$2', $t) ?? $t;
        $t = preg_replace('/(?<![*\w])([*_])(?!\s)(.+?)(?<!\s)\1(?![*\w])/u', '$2', $t) ?? $t;
        $t = preg_replace('/^\s*[*+]\s+/m', '- ', $t) ?? $t;
        $t = preg_replace('/`([^`]*)`/u', '$1', $t) ?? $t;

        return trim($t);
    }

    private static function converter(): MarkdownConverter
    {
        if (self::$converter === null) {
            $environment = new Environment([
                'html_input' => 'escape',
                'allow_unsafe_links' => false,
                'max_nesting_level' => 20,
                'external_link' => [
                    'internal_hosts' => [],
                    'open_in_new_window' => true,
                    'nofollow' => 'external',
                    'noopener' => 'external',
                    'noreferrer' => 'external',
                ],
                'disallowed_raw_html' => ['disallowed_tags' => ['script', 'iframe', 'style', 'textarea', 'title', 'noembed', 'noframes', 'plaintext', 'xmp']],
            ]);
            $environment->addExtension(new CommonMarkCoreExtension);
            $environment->addExtension(new AutolinkExtension);
            $environment->addExtension(new StrikethroughExtension);
            $environment->addExtension(new DisallowedRawHtmlExtension);
            $environment->addExtension(new ExternalLinkExtension);
            // Bilder nicht einbinden, sondern als Alternativtext darstellen.
            $environment->addEventListener(DocumentParsedEvent::class, function (DocumentParsedEvent $event): void {
                $walker = $event->getDocument()->walker();
                $images = [];
                while ($e = $walker->next()) {
                    if ($e->isEntering() && $e->getNode() instanceof Image) {
                        $images[] = $e->getNode();
                    }
                }
                foreach ($images as $image) {
                    $alt = '';
                    foreach ($image->children() as $child) {
                        if ($child instanceof Text) {
                            $alt .= $child->getLiteral();
                        }
                    }
                    $image->replaceWith(new Text('[Bild: '.($alt !== '' ? $alt : $image->getUrl()).']'));
                }
            });
            self::$converter = new MarkdownConverter($environment);
        }

        return self::$converter;
    }
}
