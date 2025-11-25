<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendOtpMail extends Mailable
{
    use Queueable, SerializesModels;
    public $otp;
    public $username;
    /**
     * Create a new message instance.
     */
    
    public function __construct($otp, $username)
    {
        $this->otp = $otp;
        $this->username = $username;
    }

    /**
     * Get the message envelope.
     */
     public function build()
    {
        return $this->subject('Login OTP Code')
            ->view('emails.otp');
    }
}
