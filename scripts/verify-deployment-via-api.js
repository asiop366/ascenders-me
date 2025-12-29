const https = require('https');

const data = JSON.stringify({
    email: '4si0p.555@gmail.com',
    password: 'ASiop19684242',
    redirect: false,
    csrfToken: '' // NextAuth usually requires this, but let's test a simpler endpoint first or handling of GET csrf
});

// Since NextAuth requires CSRF, a direct POST is hard without a session.
// Instead, let's verify if the USER exists via a public route we might have?
// No, user wants login verification.

// Alternate plan: Use the auth-debug route I made earlier?
// I created /api/auth-debug/route.ts in step 1888.
// Does it exist on prod? The user said they "already put the vercel on".
// If the user deployed, then /api/auth-debug might be there.

const options = {
    hostname: 'www.ascenders.me',
    port: 443,
    path: '/api/auth-debug',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);
    let body = '';
    res.on('data', (d) => body += d);
    res.on('end', () => console.log('Response:', body));
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
