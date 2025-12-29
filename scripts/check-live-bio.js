const https = require('https');

const url = 'https://www.ascenders.me/app/u/asiop';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (data.includes('Deployment Chec')) {
            console.log('Bio verified: FOUND on live site.');
        } else {
            console.log('Bio verification: NOT FOUND on live site.');
        }
    });

}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
