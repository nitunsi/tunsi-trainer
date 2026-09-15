const fs=require('fs'),SP=process.env.SP;
const {HARAKA,BASE,isH,word2alpha}=require('./chatalpha.js');
const SUN='تثدذرزسشصضطظلنج';
const FAT='َ',KAS='ِ',DAM='ُ',SUK='ْ',SHA='ّ';
const OPTS=['',FAT,KAS,DAM,SUK,SHA,FAT+SHA,KAS+SHA,DAM+SHA];

// ein Schritt der Ableitung (identisch zur Funktion, nur isoliert)
function step(out, ch, diac, isLast, skipShadda){
  const hasSh = diac.includes(SHA) && !skipShadda;
  const anfang = (out==='' || out.slice(-1)==='-');
  let base = (ch in BASE)?BASE[ch]:null;
  if(base!==null){ if(hasSh && base!=='') base=base+base; out+=base; }
  else if('اأإآةى'.includes(ch)){
    if('اأإآ'.includes(ch) && anfang && /[َُِ]/.test(diac)) {}
    else if(ch==='إ' && anfang) out+='i';
    else if(out.slice(-1)!=='a') out+='a';
  }
  else if(ch==='و'){
    if(hasSh) out+='ww';
    else if(out.slice(-1)==='o' && (diac===''||diac===SUK)) out+='u';
    else if(isLast && (diac===''||diac===SUK) && !/[aeiou]/.test(out.slice(-1))) out+='ou';
    else out+='w';
  }
  else if(ch==='ي'){
    if(hasSh) out+='yy';
    else if(out.slice(-1)==='i' && diac==='') {}
    else out+='y';
  }
  else out+=ch;
  const vow = diac.includes(FAT)?'a' : diac.includes(KAS)?'i' : diac.includes(DAM)?'o' : '';
  return out+vow;
}

function solve(letters, target, artikelOut, startIdx, skipShaddaFirst){
  const sols=[];
  const n=letters.length;
  (function dfs(i, out, acc, skipSh){
    if(sols.length>400) return;
    if(i===n){ if(out===target) sols.push(acc.slice()); return; }
    const ch=letters[i];
    const isLast=(i===n-1);
    let opts=OPTS;
    if('اآى'.includes(ch)) opts=(i===startIdx)?['',FAT,KAS,DAM]:[''];     // reiner Langvokaltraeger
    else if('أإ'.includes(ch)) opts=(i===startIdx)?['',FAT,KAS,DAM]:[''];
    else if(ch==='ة') opts=['',SUK];
    else if('ءؤئ'.includes(ch)) opts=[''];
    for(const d of opts){
      if(d.includes(SHA)){
        if(i===startIdx) continue;             // nie Schadda auf dem ersten Buchstaben
        if('اآأإ'.includes(ch)) continue;       // nie Schadda auf reinem Langvokaltraeger
      }
      const o2=step(out, ch, d, isLast, skipSh);
      if(!target.startsWith(o2)) continue;
      acc.push(d); dfs(i+1, o2, acc, false); acc.pop();
    }
  })(startIdx, artikelOut, [], skipShaddaFirst);
  return sols;
}

function vokalisiere(ar, darija){
  const w=ar.trim();
  if(/\s/.test(w)) return null;
  const target=(darija||'').toLowerCase().trim();
  if(!target) return null;
  // Artikel-Vorspann wie in der Funktion
  let startIdx=0, artikelOut='', skipSh=false;
  if('اأإ'.includes(w[0]) && w[1]==='ل' && w.length>2 && !isH(w[2])){
    let i=2; while(i<w.length && isH(w[i])) i++;
    if(i<w.length && SUN.includes(w[i])){ artikelOut='e'+word2alpha(w[i])+'-'; skipSh=true; }
    else artikelOut='el-';
    startIdx=i;
  }
  const letters=[...w].filter(c=>!isH(c));
  // Index des Artikel-Starts im gefilterten Array
  const filteredStart = startIdx===0?0:[...w.slice(0,startIdx)].filter(c=>!isH(c)).length;
  const sols=solve(letters, target, artikelOut, filteredStart, skipSh);
  if(!sols.length) return null;
  // Bewertung: moeglichst viele markierte Konsonanten, dann Sukun am Wortende
  const score=s=>{
    let k=0;
    for(let i=filteredStart;i<letters.length;i++){
      const ch=letters[i], d=s[i-filteredStart];
      const markierbar=(ch in BASE)||'وي'.includes(ch);
      if(markierbar && d && d!=='') k+=2;
      if(markierbar && d==='') k-=1;
    }
    if(s[s.length-1]===SUK && (letters[letters.length-1] in BASE)) k+=1;
    return k;
  };
  sols.sort((a,b)=>score(b)-score(a));
  const best=sols[0];
  let res=w.slice(0,startIdx);
  for(let i=filteredStart;i<letters.length;i++) res+=letters[i]+(best[i-filteredStart]||'');
  return {neu:res, loesungen:sols.length};
}


module.exports={vokalisiere};
