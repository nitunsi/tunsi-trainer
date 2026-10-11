import json,re,collections,difflib
m={'ḥ':'7','ʕ':'3','ṭ':'t','ṣ':'s','ḍ':'d','ḏ':'dh','ẓ':'z','š':'sh','ž':'j','ġ':'gh','ā':'a','ī':'i','ū':'u','ē':'e','ō':'o','ṛ':'r','ṃ':'m','ḷ':'l','ṇ':'n','ʔ':'','ʾ':'','ʰ':'','²':''}
def conv(s):
    s=(s or '').lower()
    for a,b in m.items(): s=s.replace(a,b)
    return s.replace('x','kh')
MAP={'sh':'C','kh':'X','gh':'G','th':'T','dh':'D','ch':'C'}
def skw(w):
    w=re.sub(r"[^a-z0-9]",'',w)
    for k,v in MAP.items(): w=w.replace(k,v)
    t={'b':'B','t':'T','j':'J','7':'H','h':'H','d':'D','r':'R','z':'Z','s':'S','3':'A','f':'F','q':'K','k':'K','g':'K','l':'L','m':'M','n':'N','p':'B','v':'F','c':'C','9':'K'}
    w=''.join(t.get(c,c if c.isupper() else '') for c in w)
    return re.sub(r'(.)\1+',r'\1',w)
pages=json.load(open('pages.json'))
items=[]
for p in pages:
    txt=conv(p['content'])
    for ln in re.split(r'\n+',txt):
        for part in re.split(r'(?<=[?.!])\s+|\s\d{1,2}\.\s',ln):
            ws=re.findall(r"[a-z0-9']+(?:-[a-z0-9']+)*",part)
            if 3<=len(ws)<=14: items.append((p['lesson_number'],p['pdf_page'],part.strip(),[skw(x.replace('-','')) for x in ws]))
print('Skript-Zeilen',len(items))
ex=sum([json.load(open(f'exn{i}.json')) for i in range(3)],[])
def tun_prompt(e):
    p=e['prompt'] or ''
    p=re.sub(r'\([^)]*\)','',p)
    if re.search(r'[äöüÄÖÜ]|\b(Sie|Ich|Wir|Der|Die|Das|Was|Wie|Wer|Wo|Ist|Bist|Hast|Negieren|Setzen|Bilden)\b',p): return None
    return p
cands=[];idx=collections.defaultdict(list)
for k,it in enumerate(items):
    for w in set(it[3]): idx[w].append(k)
res=collections.Counter();diffs=[];unm=[]
for e in ex:
    if e['exercise_type'] in ('pronunciation','grammar_card','build_dialog','grammar_drill'): continue
    p=tun_prompt(e)
    if not p: continue
    ws=re.findall(r"[a-z0-9']+(?:-[a-z0-9']+)*",p.lower())
    if len(ws)<3: continue
    sk=[skw(x.replace('-','')) for x in ws]
    sc=collections.Counter()
    for w in set(sk):
        for k in idx.get(w,[]): sc[k]+=1
    best=None;bs=0
    for k,c in sc.most_common(8):
        it=items[k]; j=c/len(set(sk)|set(it[3]))
        if j>bs: bs=j;best=k
    if best is None or bs<0.6: res['kein Treffer']+=1; unm.append((e['id'],p[:70])); continue
    it=items[best]
    if sk==it[3]: res['gleich (Konsonantengerüst)']+=1; continue
    sm=difflib.SequenceMatcher(None,sk,it[3])
    d=[(ws[i1:i2],it[2].split()[j1:j2] if False else it[3][j1:j2]) for tag,i1,i2,j1,j2 in sm.get_opcodes() if tag!='equal']
    res['abweichend']+=1; diffs.append((e['id'],p[:80],it[2][:80],it[0],it[1],d[:3]))
print(res)
json.dump({'diffs':diffs,'unm':unm},open('treue.json','w'),ensure_ascii=False)
for d in diffs[:45]: print(d)
