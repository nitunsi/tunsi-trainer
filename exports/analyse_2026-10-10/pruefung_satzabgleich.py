import json,re,glob,collections
AR={'ب':'B','ت':'T','ط':'T','ث':'T','ج':'J','ح':'H','ه':'H','خ':'X','د':'D','ض':'D','ذ':'D','ظ':'D','ر':'R','ز':'Z','س':'S','ص':'S','ش':'C','ع':'A','غ':'G','ف':'F','ق':'K','ك':'K','گ':'K','ڨ':'K','ل':'L','م':'M','ن':'N','ة':'H','پ':'B','ڤ':'F','چ':'C'}
def skel_ar(s):
    out=[]
    for ch in s:
        c=AR.get(ch)
        if c: out.append(c)
    return collapse(''.join(out))
def collapse(s): return re.sub(r'(.)\1+',r'\1',s)
def skel_tr(s):
    s=s.lower()
    s=re.sub(r"[^a-z0-9]","",s)
    s=s.replace('sh','C').replace('ch','C').replace('kh','X').replace('gh','G').replace('th','T').replace('dh','D')
    m={'b':'B','t':'T','j':'J','7':'H','h':'H','d':'D','r':'R','z':'Z','s':'S','3':'A','f':'F','q':'K','k':'K','g':'K','l':'L','m':'M','n':'N','p':'B','v':'F','c':'C','9':'K'}
    return collapse(''.join(m.get(c,c if c.isupper() else '') for c in s))
# Korpus
corp=[]
for f in sorted(glob.glob('nin*.json')):
    for r in json.load(open(f)):
        for x in (r['samples'] or []):
            if x.get('ar'): corp.append(('ninja',skel_ar(x['ar'])))
m={'ḥ':'7','ʕ':'3','ṭ':'t','ṣ':'s','ḍ':'d','ḏ':'dh','ẓ':'z','š':'sh','ž':'j','ġ':'gh','ā':'a','ī':'i','ū':'u','ē':'e','ō':'o','ṛ':'r'}
def conv(s):
    s=(s or '').lower()
    for a,b in m.items(): s=s.replace(a,b)
    return s.replace('x','kh')
for p in json.load(open('pages.json')): corp.append(('skript',skel_tr(conv(p['content']))))
for x in json.load(open('pcg.json')): corp.append(('pc',skel_tr(x['raw_text'] or '')))
for i in range(5):
    for v in json.load(open(f'v{i}.json')): corp.append(('vocab',skel_tr(v['darija'] or '')))
big={}
for src in ('ninja','skript','pc','vocab'): big[src]='|'.join(s for k,s in corp if k==src)
print({k:len(v) for k,v in big.items()})
allbig='|'.join(big.values())
W=6
def windows(s): return [s[i:i+W] for i in range(len(s)-W+1)] if len(s)>=W else []
# Fensterindex als Set
idx=set()
for k in ('ninja','skript','pc'):
    s=big[k]
    for i in range(len(s)-W+1): idx.add(s[i:i+W])
print('Fenster',len(idx))
def tpart(sol):
    s=re.split(r'\s[—–-]\s',sol or '')[0]; return re.sub(r'\([^)]*\)','',s)
ex=sum([json.load(open(f'exn{i}.json')) for i in range(3)],[])
res={}
for e in ex:
    if e['exercise_type'] in ('pronunciation','build_dialog','grammar_card'): continue
    sk=skel_tr(tpart(e['solution']))
    w=windows(sk)
    if len(w)<3: continue
    cov=sum(1 for x in w if x in idx)/len(w)
    res[e['id']]=(round(cov,2),len(w),(e['meta'] or {}).get('beleg'),e['exercise_type'])
json.dump(res,open('satz.json','w'))
import statistics
print('Übungen',len(res),'Median',statistics.median(c for c,_,_,_ in res.values()))
b=collections.Counter()
for c,n,l,t in res.values(): b[(l, 'hoch>=0.8' if c>=0.8 else 'mittel' if c>=0.5 else 'niedrig<0.5')]+=1
for k,v in sorted(b.items(),key=lambda x:(str(x[0][0]),x[0][1])): print(k,v)

import random,statistics
random.seed(1)
def cov_of(text,Wn):
    sk=skel_tr(text); 
    w=[sk[i:i+Wn] for i in range(len(sk)-Wn+1)]
    return (sum(1 for x in w if x in idxs[Wn])/len(w)) if len(w)>=3 else None
idxs={}
for Wn in (5,6,7):
    s=set()
    for k in ('ninja','skript','pc'):
        t=big[k]
        for i in range(len(t)-Wn+1): s.add(t[i:i+Wn])
    idxs[Wn]=s
sample=[e for e in ex if e['exercise_type'] in ('translate_de_tn','fill_blank','fixed_response','answer_pattern') and (e['meta'] or {}).get('beleg') in ('belegt','skript')]
random.shuffle(sample); sample=sample[:400]
for Wn in (5,6,7):
    a=[];b=[]
    for e in sample:
        t=tpart(e['solution']); words=re.split(r'\s+',t.strip())
        c1=cov_of(t,Wn); 
        sh=words[:]; random.shuffle(sh); c2=cov_of(' '.join(sh),Wn)
        if c1 is not None and c2 is not None: a.append(c1); b.append(c2)
    print('W',Wn,'original median',round(statistics.median(a),2),'gemischt median',round(statistics.median(b),2),'n',len(a), 'Anteil orig>=0.5',round(sum(1 for x in a if x>=0.5)/len(a),2),'gemischt>=0.5',round(sum(1 for x in b if x>=0.5)/len(b),2))
