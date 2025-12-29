const https = require('https');

const url = 'https://www.ascenders.me/';

console.log('Fetching ' + url + '...');

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('HTML Length:', data.length);
        // Print the first 2000 chars to see if we can spot thread titles or clues
        // Or better, look for "ago" or specific user names
        console.log(data.substring(0, 3000));
    });
}).on('error', err => console.error(err));
