// Exakter Port von public._arabic_to_chatalpha (Einzelwort-Fall)
const HARAKA='ًٌٍَُِّْٰٟ';
const SUN='تثدذرزسشصضطظلنج';
const BASE={'ب':'b','ت':'t','ث':'th','ج':'j','ح':'7','خ':'kh','د':'d','ذ':'th','ر':'r','ز':'z',
 'س':'s','ش':'sh','ص':'s','ض':'dh','ط':'t','ظ':'th','ع':'3','غ':'gh','ف':'f','ق':'q','ك':'k',
 'ل':'l','م':'m','ن':'n','ه':'h','پ':'p','ڤ':'v','ڥ':'v','ڨ':'g','گ':'g','چ':'j','ء':'','ؤ':'','ئ':''};
const isH=c=>HARAKA.includes(c);

function word2alpha(w0){
  let w=w0.replace(new RegExp('و(['+HARAKA+']*)ا$'),'و$1');
  let out='',i=0,skipShadda=false;
  if('اأإ'.includes(w[0]) && w[1]==='ل' && w.length>2 && !isH(w[2])){
    i=2; while(i<w.length && isH(w[i])) i++;
    if(i<w.length && SUN.includes(w[i])){ out='e'+word2alpha(w[i])+'-'; skipShadda=true; }
    else out='el-';
  }
  while(i<w.length){
    const ch=w[i];
    if(isH(ch)){ i++; continue; }
    let diac=''; while(i+diac.length+1<w.length && isH(w[i+diac.length+1])) diac+=w[i+diac.length+1];
    const hasSh = diac.includes('ّ') && !skipShadda; skipShadda=false;
    const last = (i+diac.length === w.length-1);
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
      else if(out.slice(-1)==='o' && (diac===''||diac==='ْ')) out+='u';
      else if(last && (diac===''||diac==='ْ') && !/[aeiou]/.test(out.slice(-1))) out+='ou';
      else out+='w';
    }
    else if(ch==='ي'){
      if(hasSh) out+='yy';
      else if(out.slice(-1)==='i' && diac==='') {}
      else out+='y';
    }
    else out+=ch;
    let vow = diac.includes('َ')?'a' : diac.includes('ِ')?'i' : diac.includes('ُ')?'o'
            : diac.includes('ً')?'an' : diac.includes('ٍ')?'in' : diac.includes('ٌ')?'on'
            : diac.includes('ٰ')?'a' : '';
    out+=vow;
    i += 1 + diac.length;
  }
  return out;
}
module.exports={word2alpha, HARAKA, BASE, isH};
