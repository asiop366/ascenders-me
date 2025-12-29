const https = require('https');

// The specific deployment URL from the last vercel --prod run
const url = 'https://ascenders-ayud5b7vc-4si0p555-gmailcoms-projects.vercel.app/app/u/asiop';
const probeId = 'PROBE'; // Just look for "PROBE" since we know it's there from previous run

console.log(`Checking deployment: ${url}...`);

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        if (data.includes('PROBE')) {
            console.log('✅ SUCCESS: The new deployment HAS the probe!');
        } else {
            console.log('❌ FAILURE: Even the new deployment is missing the probe.');
        }
    });
}).on('error', err => console.error(err));
