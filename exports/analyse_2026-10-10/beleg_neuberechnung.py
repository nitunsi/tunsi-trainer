import json,re,glob,collections
def toks(s): return re.findall(r"[a-z0-9']+",(s or '').lower().replace('’',"'"))
def full(s):
    s=s.lower().replace('9','k').replace('q','k').replace('2','').replace('7','h').replace('3','a')
    s=re.sub(r'sch|ch','sh',s); s=s.replace('kh','x').replace('gh','g').replace('dh','d').replace('th','t')
    s=s.replace('ou','u').replace('oo','u').replace('ey','i').replace('ei','i'); s=re.sub(r'y$','i',s)
    s=re.sub(r'([bcdfghjklmnpqrstvwxz])\1',r'\1',s); s=re.sub(r'([aeiou])\1+',r'\1',s); return s
m={'ḥ':'7','ʕ':'3','ṭ':'t','ṣ':'s','ḍ':'d','ḏ':'dh','ẓ':'z','š':'sh','ž':'j','ġ':'gh','ā':'a','ī':'i','ū':'u','ē':'e','ō':'o','ṛ':'r','ṃ':'m','ḷ':'l','ṇ':'n','ʔ':'','ʾ':''}
def conv(s):
    s=(s or '').lower()
    for a,b in m.items(): s=s.replace(a,b)
    return s.replace('x','kh')
E=set(); EL=set()
def add(s):
    for t in toks(s): E.add(t); EL.add(full(t))
for f in glob.glob('wf*.json'):
    for r in json.load(open(f)): add((r['form_chatalpha'] or '')+' '+(r['lemma_chatalpha'] or ''))
for f in ['tunico_corpus_nouns.json','tunico_corpus_adjectives.json','tunico_corpus_verbs.json']:
    for r in json.load(open(f)): add(' '.join(r['forms_chatalpha'] or [])+' '+(r['lemma_chatalpha'] or ''))
for f in glob.glob('ti*.json'):
    for r in json.load(open(f)):
        add((r['lemma_chatalpha'] or '')+' '+' '.join(r['variants_chatalpha'] or []))
        for x in (r['inflected'] or []): add(x.get('chatalpha',''))
for f in glob.glob('pc*.json'):
    for r in json.load(open(f)): add(' '.join(r['forms_chatalpha'] or []))
for f in glob.glob('nj*.json'):
    for r in json.load(open(f)): add((r['chatalpha'] or '')+' '+(r['chatalpha_plural'] or ''))
for i in range(5):
    for x in json.load(open(f'v{i}.json')): add((x['darija'] or '')+' '+json.dumps(x.get('conjugation') or '',ensure_ascii=False))
pages=json.load(open('pages.json'))
page_seq=[]
for p in pages:
    ts=toks(conv(p['content'])); page_seq.append([full(t) for t in ts])
    for t in ts: E.add(t); EL.add(full(t))
for l in json.load(open('lessons.json')): add((l['grammar_notes'] or '')+' '+(l['dialog_text'] or ''))
big=' '+' | '.join(' '.join(s) for s in page_seq)+' '
pre=['','t','n','y','b','m','i','l','w','f','it','il','is','ir','iz','ish','id','in','ij','el','tit','nit','bi','ti','ni','yi']
suf=['','sh','ish','u','w','in','a','at','ha','hom','hum','na','kum','ni','i','ik','ek','ti','tu','ou','ak','h','k','nsh','ush','t','li','lu','lik','lha','lna','lkum','lhum']
def ok(t):
    if t.isdigit(): return 'ok'
    if t in E or full(t) in EL: return 'ok'
    for p in pre:
        if p and not t.startswith(p): continue
        r=t[len(p):]
        for s in suf:
            if s and not r.endswith(s): continue
            c=r[:len(r)-len(s)] if s else r
            if len(c)>=3 and (c in E or full(c) in EL): return 'abgeleitet'
    return 'unbekannt'
def tpart(sol):
    s=re.split(r'\s[—–-]\s',sol)[0]; return re.sub(r'\([^)]*\)','',s)
ex=sum([json.load(open(f'exn{i}.json')) for i in range(3)],[])
FORCE={i:'unsicher' for i in list(range(963,979))+[1060,1888]}
res={};chg=collections.Counter();det=[]
rank={'unsicher':0,'abgeleitet':1,'belegt':2,'skript':3}
for e in ex:
    if e['exercise_type']=='pronunciation': continue
    cur=(e['meta'] or {}).get('beleg')
    if e['id'] in FORCE: new='unsicher'
    elif e['source']=='original': new='skript'
    else:
        tk=[t for t in toks(tpart(e['solution'] or '')) if len(t)>1]
        ger=set(toks(e['prompt'] or ''))
        seq=' '+' '.join(full(t) for t in tk)+' '
        if len(tk)>=3 and seq in big: new='skript'
        else:
            cl=[ok(t) for t in tk if t not in ger]
            new='unsicher' if 'unbekannt' in cl else ('belegt' if all(c=='ok' for c in cl) else 'abgeleitet')
    res[e['id']]=(cur,new)
    chg[(cur,new)]+=1
for k,v in sorted(chg.items(),key=lambda x:-x[1]): print(k,v)
json.dump({str(k):v for k,v in res.items()},open('relevel2.json','w'))

print('--- belegt->unsicher Details')
for e in ex:
    r=res.get(e['id'])
    if r and r==('belegt','unsicher') and e['id'] not in FORCE:
        tk=[t for t in toks(tpart(e['solution'] or '')) if len(t)>1]; ger=set(toks(e['prompt'] or ''))
        print(e['id'],[t for t in tk if t not in ger and ok(t)=='unbekannt'],'|',e['solution'][:60])
