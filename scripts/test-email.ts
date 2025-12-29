import { Resend } from 'resend';

const resend = new Resend('re_Beki6rGJ_ANFWkwx1sr8gNEVndbJKD7uH');

async function testEmail() {
    try {
        const data = await resend.emails.send({
            from: 'noreply@ascenders.me',
            to: '4si0p.555@gmail.com',
            subject: 'Test Ascenders Domain Configuration',
            html: '<p>Si tu reçois cet email, c\'est que ton domaine est PARFAITEMENT configuré ! 🎉</p>'
        });
        console.log('✅ Email envoyé avec succès ! ID:', data);
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi :', error);
    }
}

testEmail();
