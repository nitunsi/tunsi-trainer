import json,re,glob,collections
AR={'ب':'B','ت':'T','ط':'T','ث':'T','ج':'J','ح':'H','ه':'H','خ':'X','د':'D','ض':'D','ذ':'D','ظ':'D','ر':'R','ز':'Z','س':'S','ص':'S','ش':'C','ع':'A','غ':'G','ف':'F','ق':'K','ك':'K','گ':'K','ڨ':'K','ل':'L','م':'M','ن':'N','ة':'H','پ':'B','ڤ':'F','چ':'C'}
def col(s): return re.sub(r'(.)\1+',r'\1',s)
def skar(s): return col(''.join(AR.get(c,'') for c in s))
def sktr(s):
    s=re.sub(r"[^a-z0-9]","",s.lower())
    s=s.replace('sh','C').replace('ch','C').replace('kh','X').replace('gh','G').replace('th','T').replace('dh','D')
    m={'b':'B','t':'T','j':'J','7':'H','h':'H','d':'D','r':'R','z':'Z','s':'S','3':'A','f':'F','q':'K','k':'K','g':'K','l':'L','m':'M','n':'N','p':'B','v':'F','c':'C','9':'K'}
    return col(''.join(m.get(c,c if c.isupper() else '') for c in s))
V=sum([json.load(open(f'vfull{i}.json')) for i in range(4)],[])
print(len(V))
# A: Arabisch vs Umschrift (Konsonantengerüst), nur Einzelwörter
bad=[];n=0
for v in V:
    d=(v['darija'] or '').strip(); a=(v['arabic_script'] or '').strip()
    if not d or not a: continue
    if re.search(r'\s',d) or re.search(r'\s',a): continue
    n+=1
    sd,sa=sktr(d),skar(a)
    if sd!=sa:
        # ʔ/Hamza, Artikel, Ta marbuta etc. lockern: gleiche nach Entfernen von A,H am Rand
        def norm(x,arab):
            x=x.replace('G','K').replace('Z','S').replace('D','D')
            return x
        sd2,sa2=norm(sd,0),norm(sa,1)
        # Ta marbuta/He am Ende, Artikel, Hamza-Rand lockern
        cands={sa2, sa2.rstrip('H'), sa2.lstrip('L'), sa2.lstrip('L').rstrip('H'), sa2.strip('A'), sa2.rstrip('H').strip('A')}
        cd={sd2, sd2.strip('A'), sd2.rstrip('H')}
        if not (cands & cd | {x.strip('A') for x in cands} & {x.strip('A') for x in cd}): bad.append((v['id'],d,a,v['german'][:30],sd,sa))
print('A) Einzelwörter',n,'Gerüst Umschrift != Arabisch:',len(bad))
for b in bad[:40]: print(b)
json.dump(bad,open('vok_arabisch_diff.json','w'),ensure_ascii=False)
