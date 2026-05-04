import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Daewoo Battery — Digibit Case Study', description: 'Making car batteries shareable: +68% qualified leads and 7M organic impressions for Daewoo Battery.' };
export default function CaseDaewoo() {
  return <CasePage
    title="Daewoo Battery" desc="Charging ahead"
    meta={{ client:'Daewoo Battery', industry:'Industrial · Energy', engagement:'Web · Content · Paid Media', timeline:'14 weeks', year:'2025' }}
    h1={<>Making car batteries <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>shareable</em>.</>}
    lede="Daewoo Battery is everywhere — but invisible online. We rebuilt their digital presence around the dealers and installers who actually live with the product, and turned a category nobody talks about into a feed people stop scrolling for."
    visualBg="linear-gradient(135deg, #7a1020 0%, #c41e3a 60%, #f4b942 100%)"
    visualWord={<>Daewoo<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>Power</em></>}
    stats={[
      {count:68,suffix:'%',label:'Qualified leads'},
      {count:7,suffix:'M',label:'Organic impressions'},
      {count:240,suffix:'%',label:'Follower growth'},
      {count:14,suffix:'wks',label:'To launch'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:'An iconic name with a 1990s digital footprint.', paras:["Daewoo Battery is the market leader in three countries, but most consumers find them through dealer signage, not search. Their site existed mostly as a PDF brochure, and their social channels hadn't been touched in two years.","The mandate: build a digital engine worthy of the brand's actual market position — and find a content angle in a category that consumers, frankly, don't care about until it fails."], quote:"We sell to people on the worst day of their week. We needed to be there before that day, not just after." },
      { label:'BEFORE / AFTER — DIGITAL HOME', word:'Daewoo.', bg:'linear-gradient(135deg, #7a1020 0%, #c41e3a 60%, #f4b942 100%)' },
      { eyebrow:'What we did', heading:'A platform, a content engine, and a story worth telling.', items:["Site rebuild on Webflow with a dealer-locator API and a fitment lookup that works without the customer knowing their car's spec.","Content system built around the people who install the batteries — short documentary cuts shot at 14 dealers across three countries.","Performance media: Meta + Google Search + YouTube TrueView, all pointed at fitment-search rather than generic awareness.","A loyalty program for dealers, with a B2B portal for stock-checks, claims and warranty registration.","A monthly editorial calendar — installer interviews, technical explainers, and seasonal content (cold starts, monsoon prep, summer load tests)."] },
      { label:'INSTALLER FILMS — SHOT 0014', word:'In the bay.', bg:'linear-gradient(135deg, #f4b942 0%, #c41e3a 100%)' },
      { eyebrow:'The outcome', heading:'Leads went up. Sentiment went up. Dealers started linking us themselves.', paras:["In a quarter, qualified leads were up 68% — and more importantly, the cost-per-lead dropped under what their distributor margin could absorb. Organic social hit seven million impressions, a number the marketing director had to verify three times before sharing internally.","The unexpected result: dealers started cutting our content into their own channels, multiplying reach for free. We hadn't designed for that — but we built a content system that other people wanted to use."], quote:"Our dealers are doing our marketing for us now. That has never happened before." },
    ]}
    nav={{ prev:{href:'/work/ummah',title:'Ummah Travel'}, next:{href:'/work/imc',title:'IMC Hospital'} }}
  />;
}
