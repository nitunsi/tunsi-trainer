import json,re,glob,collections
E=set()
def add(s):
    for t in re.findall(r"[a-z0-9']+",(s or '').lower()): E.add(t)
for f in glob.glob('wf*.json'):
    for r in json.load(open(f)): add((r['form_chatalpha'] or '')+' '+(r['lemma_chatalpha'] or ''))
for f in ['tunico_corpus_nouns.json','tunico_corpus_adjectives.json','tunico_corpus_verbs.json']:
    for r in json.load(open(f)): add(' '.join(r['forms_chatalpha'] or [])+' '+(r['lemma_chatalpha'] or ''))
for f in glob.glob('ti*.json'):
    for r in json.load(open(f)):
        add((r['lemma_chatalpha'] or '')+' '+' '.join(r['variants_chatalpha'] or []))
        for x in (r['inflected'] or []): add(x.get('chatalpha',''))
for i in range(5):
    for x in json.load(open(f'v{i}.json')): add((x['darija'] or '')+' '+json.dumps(x.get('conjugation') or '',ensure_ascii=False))
def tpart(sol):
    s=re.sub(r'\([^)]*\)','',sol or ''); s=re.sub(r'"[^"]*"','',s); s=re.sub(r'\s[—–]\s.*$','',s); return s
SUN=set('tdrzsjnl')
def sk(w): return re.sub(r"[aeiouy']",'',w)
PLU=collections.defaultdict(set); SG=collections.defaultdict(set)
for w in E:
    if len(w)>3 and w[0] in 'nty':
        (PLU if re.search(r'(u|w)$',w) else SG)[(w[0],sk(w).rstrip('uw'))].add(w)

PRON={'ena':'n','a7na':'n','enti':'t','entouma':'t','houwwa':'y','huwwa':'y','hiyya':'t','houma':'y'}
PLUR={'a7na','entouma','houma'}
SKIP={'ma','bash','qa3id','qa3da','qa3din','mush','kunt','kan','tawwa','dima','bikri','barsha','zada','w','hna','ghudwa','il-yum','sa3at'}
def check(text):
    out=[]
    t=tpart(text).lower()
    words=re.findall(r"[a-z0-9']+(?:-[a-z0-9']+)*",t)
    for w in words:
        parts=w.split('-')
        for k,p in enumerate(parts[:-1]):
            if p in ('il','it','is','ir','iz','ij','id','in','ish','ith','idh'):
                nxt=parts[k+1]
                if not nxt: continue
                c=nxt[0]; f2=nxt[:2]
                if f2 in ('sh','th','dh'): exp='i'+f2
                elif c in SUN: exp='i'+c
                else: exp='il'
                if c in 'aeiou3' and p!='il': out.append(('artikel',w)); continue
                if p!=exp and not (f2=='sh' and p=='is' and False):
                    # Ausnahmen: sh = ش (ish-), s+h anders
                    out.append(('artikel',w))
    for i,w in enumerate(words[:-1]):
        if w in PRON:
            j=i+1
            while j<len(words) and words[j] in SKIP: j+=1
            if j>=len(words): continue
            v=words[j]
            if v.startswith('ma-'): v=v[3:]
            v=v.split('-')[0]
            if not v or v[0] not in 'nty': continue
            exp=PRON[w]
            if v[0]!=exp:
                if exp+v[1:] in E and len(v)>3: out.append(('praefix',w+' '+v))
            else:
                ends=bool(re.search(r"(u|w|ou|au|iu)$",v))
                key=(v[0],sk(v).rstrip('uw'))
                if w in PLUR and not ends and len(v)>3 and v in E and PLU.get(key): out.append(('plural',w+' '+v))
                if w not in PLUR and ends and len(v)>3 and SG.get(key) and not any(x==v for x in SG[key]): out.append(('singular',w+' '+v))
    return out
if __name__=='__main__':
    tests=['ena tikhdim fi-tunis.','houma yikhdim fi-tunis.','ena nikhdmu hna.','entouma tikhdim bikri.','il-tawla kbira.','it-ktab il-kbir.','ena nikhdim.','houma yikhdmu.','il-qahwa il-lil','ish-sfa']
    for t in tests: print(t,check(t))
    ex=sum([json.load(open(f'exn{i}.json')) for i in range(3)],[])
    iss=collections.defaultdict(list)
    for e in ex:
        if e['exercise_type'] in ('pronunciation','build_dialog','grammar_card','grammar_drill'): continue
        for k,v in check(e['solution']): iss[k].append((e['id'],v))
    for k,v in iss.items():
        print(k,len(v),v[:15])
    json.dump(iss,open('lint2.json','w'),ensure_ascii=False)
