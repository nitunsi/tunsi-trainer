// Zieht normalize/checkAnswer/levenshtein und TRANSLIT_RULES aus trainer.html nach tools/lib.js.
// Lag frueher im Scratchpad und starb mit jeder Session; der Anker ging dabei zweimal daneben
// (PRECEDENTS.md -> extract.js). Deshalb hier versioniert, mit eingebauter Plausibilitaetspruefung.
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(ROOT,'trainer.html'),'utf8');

function between(startRe, endStr){
  const s=html.search(startRe); if(s<0) throw new Error('Anker (Start) nicht gefunden: '+startRe);
  const e=html.indexOf(endStr, s); if(e<0) throw new Error('Anker (Ende) nicht gefunden');
  return html.slice(s, e+endStr.length);
}
const norm = between(/^function normalize\(s\)\{/m, 'return {ok:false, exact:false, correct:answer};\n}');

// Ende gezielt am Abschluss von TRANSLIT_RULES suchen, NICHT am ersten "\n];" --
// dazwischen liegt seit Regel 22 auch CONSONANT_PAIRS, das genauso endet.
const loanStart  = html.search(/^const isLoanword = /m);
const rulesStart = html.indexOf('const TRANSLIT_RULES = [', loanStart);
const rulesEnd   = html.indexOf('\n];', rulesStart);
if(loanStart<0 || rulesStart<0 || rulesEnd<0) throw new Error('Anker fuer isLoanword/TRANSLIT_RULES nicht gefunden');
const loan = html.slice(loanStart, rulesEnd+3);

const out = norm + '\n' + loan +
  '\nfunction normKey(s){ return (s||\'\').toLowerCase().replace(/[\\s\\u0020\\u00a0.,;:!?()\\-\\/\\\\\'"«»]+/g,\'\'); }\n' +
  'module.exports={normalize,checkAnswer,levenshtein,TRANSLIT_RULES,isLoanword,normKey};\n';
const target=path.join(__dirname,'lib.js');
fs.writeFileSync(target,out);

// Pflichtpruefung: eine gekuerzte Regelliste prueft stumm zu wenig.
const L=require(target);
const ERWARTET = Number(process.env.TRANSLIT_RULES_ERWARTET || 23);
console.log('lib.js gebaut: '+L.TRANSLIT_RULES.length+' Regeln');
if(L.TRANSLIT_RULES.length !== ERWARTET){
  console.error('ABBRUCH: '+L.TRANSLIT_RULES.length+' Regeln statt '+ERWARTET+
    ' -- Anker hat einen Teilblock erwischt. Nicht weiterrechnen.');
  process.exit(1);
}
