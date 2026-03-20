#!/usr/bin/env node
// CLI for sahih-muslim

import fs   from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { Muslim } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const pkg        = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

function loadData() {
  const gzPath   = path.join(__dirname, '..', 'data', 'muslim.json.gz');
  const jsonPath = path.join(__dirname, '..', 'data', 'muslim.json');
  if (fs.existsSync(gzPath))   return JSON.parse(zlib.gunzipSync(fs.readFileSync(gzPath)).toString('utf8'));
  if (fs.existsSync(jsonPath)) return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  throw new Error('Data file not found. Expected data/muslim.json.gz or data/muslim.json');
}

const muslimData = loadData();
const _byId      = new Map();
const _byChapter = new Map();
muslimData.hadiths.forEach(h => {
  _byId.set(h.id, h);
  if (!_byChapter.has(h.chapterId)) _byChapter.set(h.chapterId, []);
  _byChapter.get(h.chapterId).push(h);
});

const muslim = new Muslim(muslimData);
export default muslim;
export { Muslim };

const c = { reset:'\x1b[0m',bold:'\x1b[1m',dim:'\x1b[2m',green:'\x1b[32m',yellow:'\x1b[33m',cyan:'\x1b[36m',magenta:'\x1b[35m',blue:'\x1b[34m',red:'\x1b[31m',gray:'\x1b[90m' };
const clr=(col,t)=>`${col}${t}${c.reset}`;
const bold=t=>clr(c.bold,t),green=t=>clr(c.green,t),yellow=t=>clr(c.yellow,t),cyan=t=>clr(c.cyan,t),magenta=t=>clr(c.magenta,t),gray=t=>clr(c.gray,t),red=t=>clr(c.red,t),blue=t=>clr(c.blue,t),dim=t=>clr(c.dim,t);

function highlight(text, term) {
  if (!term) return text;
  const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi');
  return text.replace(re,`\x1b[1m\x1b[33m$1\x1b[0m`);
}

function wrap(text, width=72, indent='') {
  const words=text.split(' '),lines=[];let line='';
  for(const word of words){if((line+' '+word).trim().length>width){if(line)lines.push(indent+line.trim());line=word;}else{line=(line+' '+word).trim();}}
  if(line)lines.push(indent+line.trim());
  return lines.join('\n');
}

function isRunDirectly(){
  if(!process.argv[1])return false;
  const argv1=path.resolve(process.argv[1]).toLowerCase().replace(/\\/g,'/');
  const self=__filename.toLowerCase().replace(/\\/g,'/');
  const base=path.basename(argv1).replace(/\.js$/,'');
  return argv1===self||base==='muslim';
}

if(isRunDirectly()){
const rawArgs=process.argv.slice(2);
const flags=rawArgs.filter(a=>a.startsWith('-'));
const numArgs=rawArgs.filter(a=>!a.startsWith('-'));
const wantsHelp=flags.some(f=>f==='-h'||f==='--help');
const wantsVersion=flags.some(f=>f==='-v'||f==='--version');
const wantsReact=flags.some(f=>f==='--react');
const wantsRandom=flags.some(f=>f==='--random'||f==='-r');
const wantsAll=flags.some(f=>f==='--all');
const showArabic=flags.some(f=>f==='-a'||f==='--arabic');
const showBoth=flags.some(f=>f==='-b'||f==='--both');
const printArabic=showArabic||showBoth;
const printEnglish=!showArabic||showBoth;
const searchIdx=rawArgs.findIndex(a=>a==='--search'||a==='-s');
const searchQuery=searchIdx!==-1&&rawArgs[searchIdx+1]&&!rawArgs[searchIdx+1].startsWith('-')?rawArgs[searchIdx+1]:null;
const chapterIdx=rawArgs.findIndex(a=>a==='--chapter'||a==='-c');
const chapterArg=chapterIdx!==-1&&rawArgs[chapterIdx+1]&&!rawArgs[chapterIdx+1].startsWith('-')?parseInt(rawArgs[chapterIdx+1]):null;
const DIV=gray('─'.repeat(60)),DIV2=gray('═'.repeat(60));

if(wantsVersion){console.log('');console.log('  '+bold(cyan('sahih-muslim'))+gray(' v'+pkg.version));console.log('  '+gray('Total hadiths : ')+yellow(muslimData.hadiths.length.toLocaleString()));console.log('  '+gray('Total chapters: ')+yellow(muslimData.chapters.length.toLocaleString()));console.log('  '+gray('Author        : ')+cyan('Imam Muslim ibn al-Hajjaj'));console.log('');process.exit(0);}

if(wantsRandom){printHadith(muslimData.hadiths[Math.floor(Math.random()*muslimData.hadiths.length)]);process.exit(0);}

if(chapterArg!==null){
  const hadiths=_byChapter.get(chapterArg)||[];
  const chapter=muslimData.chapters.find(c=>c.id===chapterArg);
  if(!hadiths.length){console.log('\n'+red('  No chapter found with id '+chapterArg)+'\n');process.exit(1);}
  console.log('');console.log(DIV2);
  console.log(bold(cyan('  Chapter '+chapterArg))+(chapter?gray(' — ')+yellow(chapter.english):''));
  if(chapter?.arabic)console.log('  '+magenta(chapter.arabic));
  console.log(gray('  '+hadiths.length+' hadiths'));console.log(DIV2);
  hadiths.forEach(h=>printHadith(h));process.exit(0);
}

if(searchQuery!==null){
  const start=Date.now(),ql=searchQuery.toLowerCase();
  const results=muslimData.hadiths.filter(h=>h.english?.text?.toLowerCase().includes(ql)||h.english?.narrator?.toLowerCase().includes(ql));
  const elapsed=Date.now()-start;
  console.log('');console.log(DIV2);
  console.log(bold(cyan('  Search: '))+yellow('"'+searchQuery+'"')+gray('  —  ')+green(results.length+' results')+gray('  ('+elapsed+'ms)'));
  console.log(DIV2);
  if(!results.length){console.log('\n  '+red('No hadiths found for: ')+yellow('"'+searchQuery+'"')+'\n');process.exit(0);}
  const limit=wantsAll?results.length:Math.min(5,results.length);
  results.slice(0,limit).forEach((hadith,i)=>{
    const chapter=muslimData.chapters.find(c=>c.id===hadith.chapterId);
    console.log('');
    console.log(bold(green('  #'+(i+1)))+gray('  Hadith '+hadith.id)+gray('  |  Chapter: ')+cyan(hadith.chapterId)+(chapter?gray(' — ')+dim(chapter.english):''));
    if(hadith.english?.narrator)console.log('  '+bold(yellow('Narrator: '))+magenta(hadith.english.narrator));
    if(hadith.english?.text)console.log('  '+wrap(highlight(hadith.english.text,searchQuery),68,'  ').trimStart());
    console.log(DIV);
  });
  if(!wantsAll&&results.length>5){console.log('');console.log('  '+gray('Showing ')+cyan('5')+gray(' of ')+yellow(results.length)+gray(' results.  ')+bold(blue('Run with --all to see all results')));console.log('  '+dim('muslim --search "'+searchQuery+'" --all'));console.log('');}
  process.exit(0);
}

if(wantsReact){
  const cwd=process.cwd(),srcDir=path.join(cwd,'src'),hooksDir=path.join(srcDir,'hooks');
  const pkgPath=path.join(cwd,'package.json');
  if(!fs.existsSync(pkgPath)){console.error(red('  ✗ No package.json found.'));process.exit(1);}
  const projectPkg=JSON.parse(fs.readFileSync(pkgPath,'utf8'));
  const deps={...projectPkg.dependencies,...projectPkg.devDependencies};
  if(!deps['react']){console.error(red('  ✗ React not found.'));process.exit(1);}
  if(!fs.existsSync(srcDir)){console.error(red('  ✗ No src/ directory found.'));process.exit(1);}
  if(!fs.existsSync(hooksDir))fs.mkdirSync(hooksDir,{recursive:true});
  const CDN=`https://cdn.jsdelivr.net/npm/sahih-muslim@${pkg.version}/data/muslim.json.gz`;
  const hookFile=path.join(hooksDir,'useMuslim.js');
  const hookSrc=`// Auto-generated by: muslim --react\nimport { useState, useEffect } from 'react';\nconst CDN = '${CDN}';\nlet _cache=null,_promise=null;\nconst _subs=new Set();\nfunction _load(){if(_cache)return Promise.resolve(_cache);if(_promise)return _promise;_promise=fetch(CDN).then(r=>r.arrayBuffer()).then(buf=>{const stream=new DecompressionStream('gzip');const writer=stream.writable.getWriter();const reader=stream.readable.getReader();writer.write(new Uint8Array(buf));writer.close();const chunks=[];return(function pump(){return reader.read().then(({done,value})=>{if(done){const text=new TextDecoder().decode(new Uint8Array(chunks.reduce((a,b)=>[...a,...b],[])));const data=JSON.parse(text);const hadiths=data.hadiths;const _byId=new Map();hadiths.forEach(h=>_byId.set(h.id,h));_cache=Object.assign([],hadiths,{metadata:data.metadata,chapters:data.chapters,get:id=>_byId.get(id),getByChapter:id=>hadiths.filter(h=>h.chapterId===id),search:(q,limit=0)=>{const ql=q.toLowerCase();const r=hadiths.filter(h=>h.english?.text?.toLowerCase().includes(ql)||h.english?.narrator?.toLowerCase().includes(ql));return limit>0?r.slice(0,limit):r;},getRandom:()=>hadiths[Math.floor(Math.random()*hadiths.length)]});_subs.forEach(fn=>fn(_cache));_subs.clear();return _cache;}chunks.push(value);return pump();});})();});return _promise;}\n_load();\nexport function useMuslim(){const[muslim,setMuslim]=useState(_cache);useEffect(()=>{if(_cache){setMuslim(_cache);}else{_subs.add(setMuslim);return()=>_subs.delete(setMuslim);}},[]);return muslim;}\nexport default useMuslim;\n`;
  fs.writeFileSync(hookFile,hookSrc,'utf8');
  console.log('\n  '+green('✓')+bold(' Generated: ')+cyan('src/hooks/useMuslim.js')+'\n');
  process.exit(0);
}

if(wantsHelp||(numArgs.length===0&&!searchQuery&&chapterArg===null&&!wantsRandom)){
  console.log('');console.log('  '+bold(cyan('Sahih Muslim CLI'))+gray('  v'+pkg.version));console.log('');
  console.log('  '+bold('Usage:'));
  console.log('    '+cyan('muslim')+yellow(' <hadithId>')+gray('                   Show hadith by global ID'));
  console.log('    '+cyan('muslim')+yellow(' <chapterId> <hadithId>')+gray('       Show hadith within a chapter'));
  console.log('    '+cyan('muslim')+green(' --search')+yellow(' "<query>"')+gray('            Search hadiths (top 5)'));
  console.log('    '+cyan('muslim')+green(' --search')+yellow(' "<query>"')+green(' --all')+gray('    Show all results'));
  console.log('    '+cyan('muslim')+green(' --chapter')+yellow(' <id>')+gray('              List all hadiths in a chapter'));
  console.log('    '+cyan('muslim')+green(' --random')+gray('                   Show a random hadith'));
  console.log('');
  console.log('  '+bold('Language flags:')+gray('  (default = English only)'));
  console.log('    '+green('-a')+gray(', ')+green('--arabic')+gray('   Arabic only'));
  console.log('    '+green('-b')+gray(', ')+green('--both')+gray('     Arabic + English'));
  console.log('');
  console.log('  '+bold('Other:'));
  console.log('    '+green('--react')+gray('    Generate useMuslim React hook'));
  console.log('    '+green('-v')+gray(', ')+green('--version')+gray(' Show version'));
  console.log('    '+green('-h')+gray(', ')+green('--help')+gray('    Show this help'));
  console.log('');process.exit(0);
}

function printHadith(hadith){
  if(!hadith){console.log('\n  '+red('Hadith not found.')+'\n');process.exit(1);}
  const chapter=muslimData.chapters?.find(c=>c.id===hadith.chapterId);
  console.log('');console.log(DIV2);
  const headerEn=bold(cyan('Hadith #'+hadith.id))+gray('  |  Chapter: ')+cyan(hadith.chapterId)+(chapter?.english?gray(' — ')+yellow(chapter.english):'');
  const headerAr=bold(magenta('حديث #'+hadith.id))+gray('  |  باب: ')+magenta(hadith.chapterId)+(chapter?.arabic?gray(' — ')+magenta(chapter.arabic):'');
  console.log('  '+(printArabic&&!printEnglish?headerAr:headerEn));
  console.log(DIV2);
  if(printEnglish){if(hadith.english?.narrator)console.log('  '+bold(yellow('Narrator: '))+magenta(hadith.english.narrator));if(hadith.english?.text){console.log('');console.log(wrap(hadith.english.text,68,'  '));}}
  if(printArabic){if(printEnglish)console.log('\n'+DIV);if(hadith.arabic){console.log('');console.log('  '+magenta(hadith.arabic));}}
  console.log('');console.log(DIV2);console.log('');
}

function resolveHadith(){
  if(numArgs.length===1){const id=parseInt(numArgs[0]);if(isNaN(id))return null;return _byId.get(id)||null;}
  if(numArgs.length===2){
    const chapterId=parseInt(numArgs[0]),hadithNum=parseInt(numArgs[1]);
    if(isNaN(chapterId)||isNaN(hadithNum))return null;
    const inChapter=_byChapter.get(chapterId);
    if(!inChapter?.length){console.log('\n  '+red('No chapter found with id '+chapterId+'.')+'\n');process.exit(1);}
    return inChapter.find(h=>h.id===hadithNum)??inChapter[hadithNum-1]??null;
  }
  return null;
}

if(numArgs.length>0){
  const hadith=resolveHadith();
  if(!hadith){console.log('\n  '+red('Invalid arguments.')+' Run '+cyan('muslim --help')+' for usage.\n');process.exit(1);}
  printHadith(hadith);
}
}
