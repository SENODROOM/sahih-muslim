// CommonJS example
// run: node examples/node-commonjs/example.js
'use strict';
const muslim = require('sahih-muslim');
console.log('Total hadiths:', muslim.length);
const h = muslim.get(1);
console.log('Hadith #1 narrator:', h.english.narrator);
console.log('Hadith #1 text:', h.english.text.slice(0, 80) + '...');
const results = muslim.search('prayer', 3);
console.log(`Top 3 for "prayer":`, results.map(r => r.id));
console.log('Random:', muslim.getRandom().id);
