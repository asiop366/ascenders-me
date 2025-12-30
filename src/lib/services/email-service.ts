import { Resend } from 'resend'

export class EmailService {
    private static instance: EmailService
    private resend: Resend
    private fromEmail: string

    private constructor() {
        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) {
            console.warn('[EmailService] WARNING: RESEND_API_KEY is missing.')
        }
        this.resend = new Resend(apiKey || 're_dummy_key')

        // Always prefer the verified domain in production/staging
        this.fromEmail = process.env.FROM_EMAIL || 'Ascenders <noreply@ascenders.me>'
    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService()
        }
        return EmailService.instance
    }

    private getBaseUrl(): string {
        if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
        return 'http://localhost:3000'
    }

    async sendVerificationEmail(email: string, token: string, username: string) {
        const baseUrl = this.getBaseUrl()
        const verificationUrl = `${baseUrl}/verify-email?token=${token}`

        console.log(`[EmailService] Sending verification to ${email} (Link: ${verificationUrl})`)

        const { data, error } = await this.resend.emails.send({
            from: this.fromEmail,
            to: email,
            subject: '✨ Verify your Ascenders account',
            html: `
        <!DOCTYPE html>
        <html>
          <body style="background-color: #0a0a0a; color: #ffffff; font-family: sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #6366f1;">Welcome to Ascenders!</h1>
              <p>Hey <strong>${username}</strong>,</p>
              <p>Click below to verify your account:</p>
              <a href="${verificationUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Verify Email</a>
              <p style="margin-top: 20px; font-size: 12px; color: #888;">Link: ${verificationUrl}</p>
            </div>
          </body>
        </html>
      `
        })

        if (error) {
            console.error('[EmailService] Error:', error)
            return { success: false, error }
        }

        return { success: true, data }
    }

    async sendWelcomeEmail(email: string, username: string) {
        const { data, error } = await this.resend.emails.send({
            from: this.fromEmail,
            to: email,
            subject: '🎉 Welcome to Ascenders!',
            html: `
        <!DOCTYPE html>
        <html>
          <body style="background-color: #0a0a0a; color: #ffffff; font-family: sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #6366f1;">You're in!</h1>
              <p>Welcome aboard, <strong>${username}</strong>!</p>
              <p>Your account is fully active.</p>
            </div>
          </body>
        </html>
      `
        })

        if (error) {
            console.error('[EmailService] Error:', error)
            return { success: false, error }
        }

        return { success: true, data }
    }
}

export const emailService = EmailService.getInstance()
