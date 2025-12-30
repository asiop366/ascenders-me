require('dotenv').config()
const { Resend } = require('resend')

async function main() {
    const apiKey = process.env.RESEND_API_KEY
    const resend = new Resend(apiKey)
    const targetEmail = 'eyaa04188@gmail.com'

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: targetEmail,
            subject: 'Test',
            html: '<p>Test</p>'
        })

        // Print minimal JSON to avoid buffer issues
        console.log(JSON.stringify(data))
    } catch (error) {
        console.log("ERROR_START")
        console.log(error.message)
        console.log("ERROR_END")
    }
}

main()
