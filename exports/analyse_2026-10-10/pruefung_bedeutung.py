import json,re,collections
def st(w):
    w=w.lower().replace('ä','a').replace('ö','o').replace('ü','u').replace('ß','ss'); return w[:5]
def gwords(g):
    g=re.sub(r'\([^)]*\)',' ',g or ''); return {st(x) for x in re.findall(r"[A-Za-zÄÖÜäöüß]{4,}",g)}
ger={int(k):v for k,v in json.load(open('vocab_german.json')).items()}
voc=collections.defaultdict(set)
for i in range(5):
    for x in json.load(open(f'v{i}.json')):
        d=(x['darija'] or '').lower().strip()
        if re.fullmatch(r"[a-z0-9']+",d): voc[d].add(x['id'])
ex=sum([json.load(open(f'exn{i}.json')) for i in range(3)],[])
FUNC={'mahish','mahoush','manash','mahumsh','manish','wa7da','wa7id','marti','khouya','khouk','ummi','ummu','tikhdim','taqra','tounsiya','tounsi','almani','jweb','nimsa','khouya','sa7bi','martik','umm','bou','sitta','setta','ma','il','w','bash','shnuwwa','mush','ena','enti','houwwa','hiyya','a7na','entouma','houma','hetha','hethi','hethuma','min','fi','b','l','3la','m3a','kan','kull','tawwa','ama','walla','illi','sh','ih','la','win','waqtash','shkun','kifash','3lash','qaddash','famma','3and','3andi','bikri','yum','barsha','dima','zada','ghudwa','hna'}
flag=[]
for e in ex:
    if e['exercise_type']!='translate_de_tn' or not e['prompt']: continue
    P={st(x) for x in re.findall(r"[A-Za-zÄÖÜäöüß]{4,}",e['prompt'])}
    if not P or re.search(r'\d',e['prompt']): continue
    sol=re.sub(r'\([^)]*\)','',e['solution'] or ''); sol=re.sub(r'\s[—–]\s.*$','',sol)
    toks=[t for t in re.findall(r"[a-z0-9']+",sol.lower()) if len(t)>=4 and t not in FUNC]
    bad=[]
    for t in toks:
        ids=voc.get(t)
        if not ids or len(ids)>2: continue
        if any(len(ger.get(i) or '')>28 for i in ids): continue
        G=set().union(*[gwords(ger.get(i)) for i in ids])
        if G and not (G&P): bad.append((t,sorted({ger.get(i) for i in ids})[0][:30]))
    if bad: flag.append((e['id'],e['prompt'][:70],bad[:3]))
print(len(flag))
json.dump(flag,open('gloss_flag.json','w'),ensure_ascii=False)
for f in flag: print(f)
