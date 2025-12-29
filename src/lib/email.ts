import { Resend } from 'resend'

// Global resend instance
let resendInstance: Resend | null = null

function getResend() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    resendInstance = new Resend(apiKey || 're_dummy_key_for_build')
  }
  return resendInstance
}

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const from = process.env.FROM_EMAIL || 'Ascenders <onboarding@resend.dev>'
  const resend = getResend()

  try {
    const data = await resend.emails.send({ from, to, subject, html })
    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}

export async function sendVerificationEmail(email: string, token: string, username: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`
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
