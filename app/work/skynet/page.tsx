import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Skynet — Digibit Case Study', description: 'Tripled spend, halved CPA: how we scaled Skynet paid media across three markets without efficiency collapse.' };
export default function CaseSkynet() {
  return <CasePage
    title="Skynet" desc="Going national"
    meta={{ Client:'Skynet', Industry:'Telecom · Logistics', Engagement:'Paid Media · App · CRO', Timeline:'8 months', Year:'2024' }}
    h1={<>Three times the spend. <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>Half</em> the cost per acquisition.</>}
    lede="Skynet was already the biggest courier in the country. We were brought in to scale paid media as they expanded into two new markets — without watching efficiency collapse the way it usually does at that pace."
    visualBg="linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)"
    visualWord={<>Skynet<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>Now</em></>}
    stats={[
      {count:42,suffix:'%',label:'Cost per acquisition ↓'},
      {count:3,suffix:'x',label:'Ad spend'},
      {count:3.4,suffix:'x',label:'ROAS sustained'},
      {count:2.4,suffix:'M',label:'Managed quarterly'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:'Scaling spend is easy. Scaling efficiency is the trick.', paras:["Skynet had a working performance-marketing operation, but it was tuned for a single market. As they expanded to Bangladesh and Sri Lanka, the same playbook started misfiring: CACs climbed, creative fatigued faster, and attribution got murky.","Our remit: rebuild the paid-media architecture, install a creative-rotation system that could feed three markets simultaneously, and rebuild the app's onboarding to actually convert the new traffic."], quote:"We can find the budget. The hard part is keeping the math working as we spend it." },
      { label:'CREATIVE ROTATION — Q3 LIBRARY', word:'120 ads / month.', bg:'linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)' },
      { eyebrow:'What we did', heading:'New account architecture, modular creative, rebuilt onboarding.', items:["Account restructure across Meta + Google + TikTok in three markets, mapped to lifecycle stage and language.","Modular creative system: one shoot day produced 120+ ad variants per month, rotated weekly.","Server-side tracking on GTM server container — recovered 31% of attribution lost to iOS / ad-blockers.","App onboarding rebuilt: 11 screens collapsed to 4, with permission requests deferred until value-moment.","A weekly cross-market optimization ritual — losers killed Tuesday, winners scaled Wednesday, new tests live Thursday."] },
      { label:'APP ONBOARDING — REBUILT', word:'Send. Track. Done.', bg:'linear-gradient(135deg, #2bb6ea 0%, #1a1f5c 100%)' },
      { eyebrow:'The outcome', heading:'More markets. Less budget per parcel.', paras:["Quarterly spend tripled as planned, but cost per acquisition dropped 42%. Sustained ROAS of 3.4× across three markets, with the new ones outperforming the home market by month four.","The bigger win: the creative system now produces enough variation that the team has retired the phrase \"creative fatigue\" from the weekly review. Tests stop because better ones come along, not because old ones break."], quote:"You've made our quarterly review meetings short. That alone is worth the retainer." },
    ]}
    nav={{ prev:{href:'/work/imc',title:'IMC Hospital'}, next:{href:'/work/northwind',title:'Northwind Provisions'} }}
  />;
}
