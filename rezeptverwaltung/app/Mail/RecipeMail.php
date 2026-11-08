<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class RecipeMail extends Mailable
{
    use Queueable;

    public function __construct(
        public string $recipeTitle,
        public string $bodyText,
        public ?string $personalMessage,
        public ?string $pdfData,
        public string $pdfName,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Rezept: '.$this->recipeTitle);
    }

    public function content(): Content
    {
        return new Content(text: 'mail.recipe');
    }

    public function attachments(): array
    {
        if ($this->pdfData === null) {
            return [];
        }

        return [Attachment::fromData(fn () => $this->pdfData, $this->pdfName)->withMime('application/pdf')];
    }
}
