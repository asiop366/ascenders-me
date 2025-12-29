const { PrismaClient } = require('@prisma/client')
const https = require('https');

const prisma = new PrismaClient()

async function main() {
    const email = '4si0p.555@gmail.com'
    const probeId = `PROBE-${Date.now()}` // Unique ID

    console.log(`1. Injecting probe: ${probeId} into database...`)
    await prisma.user.update({
        where: { email },
        data: { bio: `System Check: ${probeId}` }
    })
    console.log('   Probe injected.')

    console.log('2. Checking live site for probe...')
    const url = 'https://www.ascenders.me/app/u/asiop';

    // Wait a moment for propagation? Direct DB update should be instant if same DB.

    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (data.includes(probeId)) {
                console.log('✅ SUCCESS: Live site is reading from this database!');
            } else {
                console.log('❌ FAILURE: Live site allows different content. This is the WRONG database.');
                console.log('   (Bio content mismatch)');
            }
        });
    }).on('error', err => console.error(err));
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
