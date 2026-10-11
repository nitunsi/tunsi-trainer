import json,re,glob,collections
def full(s):
    s=s.lower().replace('9','k').replace('q','k').replace('2','').replace('7','h').replace('3','a')
    s=re.sub(r'sch|ch','sh',s); s=s.replace('kh','x').replace('gh','g').replace('dh','d').replace('th','d')
    s=s.replace('ou','u').replace('oo','u').replace('ey','i').replace('ei','i'); s=re.sub(r'y$','i',s)
    s=re.sub(r'([bcdfghjklmnpqrstvwxz])\1',r'\1',s); s=re.sub(r'([aeiou])\1+',r'\1',s); return s
def cons(s):
    s=full(s); s=re.sub(r"[aeiouy']",'',s); return re.sub(r'(.)\1+',r'\1',s)
E1=set(); EC=set()
def add(s):
    for t in re.findall(r"[a-z0-9']+",(s or '').lower()): E1.add(full(t)); EC.add(cons(t))
for f in glob.glob('wf[0-9].json'):
    for r in json.load(open(f)): add((r['form_chatalpha'] or '')+' '+(r['lemma_chatalpha'] or ''))
for f in ['tunico_corpus_nouns.json','tunico_corpus_adjectives.json','tunico_corpus_verbs.json']:
    for r in json.load(open(f)): add(' '.join(r['forms_chatalpha'] or [])+' '+(r['lemma_chatalpha'] or ''))
for f in glob.glob('ti[0-9].json'):
    for r in json.load(open(f)):
        add((r['lemma_chatalpha'] or '')+' '+' '.join(r['variants_chatalpha'] or []))
        for x in (r['inflected'] or []): add(x.get('chatalpha',''))
for f in glob.glob('pc[0-9].json'):
    for r in json.load(open(f)): add(' '.join(r['forms_chatalpha'] or []))
for f in glob.glob('nj[0-9]*.json'):
    for r in json.load(open(f)): add((r['chatalpha'] or '')+' '+(r['chatalpha_plural'] or ''))
pages=json.load(open('pages.json'))
m={'ḥ':'7','ʕ':'3','ṭ':'t','ṣ':'s','ḍ':'d','ḏ':'dh','ẓ':'z','š':'sh','ž':'j','ġ':'gh','ā':'a','ī':'i','ū':'u','ē':'e','ō':'o','ṛ':'r'}
def conv(s):
    s=(s or '').lower()
    for a,b in m.items(): s=s.replace(a,b)
    return s.replace('x','kh')
for p in pages: add(conv(p['content']))
V=sum([json.load(open(f'vfull{i}.json')) for i in range(4)],[])
print('Quellen-Universum',len(E1))
cnt=collections.Counter();un=[]
for v in V:
    d=(v['darija'] or '').strip().lower()
    conf=v['external_confirmed']
    toks=re.findall(r"[a-z0-9']+",d)
    if not toks: continue
    content=[t for t in toks if len(t)>=3]
    if not content: continue
    found=[ (full(t) in E1) for t in content]
    cons_found=[ (cons(t) in EC) for t in content]
    k=('bestätigt' if conf else 'unbestätigt')
    if all(found): cnt[(k,'alle Wörter belegt')]+=1
    elif all(cons_found): cnt[(k,'nur über Konsonanten belegt')]+=1
    else:
        cnt[(k,'Wort nicht in Quellen')]+=1
        if not conf: un.append((v['id'],v['darija'],v['german'][:35],v['lesson_id'],[t for t,f in zip(content,cons_found) if not f]))
for k,v in sorted(cnt.items()): print(k,v)
json.dump(un,open('vok_unbelegt.json','w'),ensure_ascii=False)
import random; random.seed(2)
for x in random.sample(un,min(45,len(un))): print(x)
