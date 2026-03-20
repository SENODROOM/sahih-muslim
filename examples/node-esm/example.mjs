// ESM example
// run: node examples/node-esm/example.mjs
import muslim from 'sahih-muslim';
console.log('Total hadiths:', muslim.length);
console.log('Title:', muslim.metadata.english.title);
const h = muslim.get(1);
console.log('Hadith #1:', h.english.narrator, '-', h.english.text.slice(0, 60) + '...');
console.log('Chapter 1 hadiths:', muslim.getByChapter(1).length);
console.log('Search "fasting":', muslim.search('fasting').length, 'results');
