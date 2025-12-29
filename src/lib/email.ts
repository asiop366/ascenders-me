import { Resend } from 'resend'

// Global resend instance
let resendInstance: Resend | null = null

function getResend() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('[EMAIL] WARNING: RESEND_API_KEY is missing. Email sending will fail.')
    }
    resendInstance = new Resend(apiKey || 're_dummy_key_for_build')
  }
  return resendInstance
}

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  // Default to Resend's testing domain if no custom FROM_EMAIL is set
  // This is critical for free tier users who haven't verified a domain yet
  const from = process.env.FROM_EMAIL || 'Ascenders <onboarding@resend.dev>'
  const resend = getResend()

  console.log(`[EMAIL] Attempting to send email to '${to}' from '${from}'`)

  try {
    const data = await resend.emails.send({ from, to, subject, html })
    console.log('[EMAIL] Sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('[EMAIL] FAILED to send email:', error)
    // Common Resend error: "showing sending to unverified email"
    return { success: false, error }
  }
}

export async function sendVerificationEmail(email: string, token: string, username: string) {
  // Determine base URL with priority: NEXTAUTH_URL > VERCEL_URL > APP_URL > localhost
  let baseUrl = process.env.NEXTAUTH_URL

  if (!baseUrl) {
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`
    } else if (process.env.APP_URL) {
      baseUrl = process.env.APP_URL
    } else {
      baseUrl = 'http://localhost:3000'
    }
  }

  // Remove trailing slash if present
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1)
  }

  const verificationUrl = `${baseUrl}/verify-email?token=${token}`

  // CRITICAL: Log this for the user so they can manually verify if email fails
  console.log('=================================================================')
  console.log('🔐 VERIFICATION LINK (Copy this if email does not arrive):')
  console.log(verificationUrl)
  console.log('=================================================================')

  const subject = '✨ Verify your Ascenders account'
  const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; }
              .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
              .content { padding: 40px 30px; }
              .content p { font-size: 16px; line-height: 1.6; color: #e5e5e5; margin-bottom: 20px; }
              .button { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; margin: 20px 0; }
              .button:hover { opacity: 0.9; }
              .footer { padding: 20px; text-align: center; font-size: 14px; color: #888; border-top: 1px solid #333; }
              .highlight { color: #6366f1; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚀 Welcome to Ascenders!</h1>
              </div>
              <div class="content">
                <p>Hey <span class="highlight">${username}</span>,</p>
                <p>To get started, please verify your email address by clicking the button below:</p>
                <div style="text-align: center;">
                  <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </div>
                <p style="font-size: 14px; color: #888;">If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="font-size: 12px; color: #666; word-break: break-all;">${verificationUrl}</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Ascenders. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
    `

  try {
    await sendEmail({ to: email, subject, html })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  const subject = '🎉 Welcome to Ascenders - Your Journey Begins!'
  const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; }
              .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
              .content { padding: 40px 30px; }
              .content p { font-size: 16px; line-height: 1.6; color: #e5e5e5; margin-bottom: 20px; }
              .highlight { color: #6366f1; font-weight: bold; }
              .footer { padding: 20px; text-align: center; font-size: 14px; color: #888; border-top: 1px solid #333; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✨ You're All Set!</h1>
              </div>
              <div class="content">
                <p>Welcome aboard, <span class="highlight">${username}</span>!</p>
                <p>Your email has been verified and your account is now active. Let's ascend together! 🚀</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Ascenders. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
    `
  try {
    await sendEmail({ to: email, subject, html })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
