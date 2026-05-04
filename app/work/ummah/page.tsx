import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Ummah Travel — Digibit Case Study', description: 'How we rebuilt the Ummah Travel brand, platform and growth engine in 8 weeks, resulting in +212% bookings.' };
export default function CaseUmmah() {
  return <CasePage
    title="Ummah Travel" desc="Pilgrimage, reimagined"
    meta={{ Client: 'Ummah Travel', Industry: 'Travel · Pilgrimage', Engagement: 'Brand · Web · Growth', Timeline: '8 weeks', Year: '2025' }}
    h1={<>Pilgrimage, <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>reimagined</em> for the phone in your pocket.</>}
    lede="Ummah Travel runs Hajj and Umrah trips for thousands of families a year. Their brand looked like a travel agent from 2009 — even though their service was anything but. We rebuilt it end-to-end in eight weeks."
    visualBg="linear-gradient(135deg, #0a4d3a 0%, #1a8a65 50%, #f4d03f 100%)"
    visualWord={<>Ummah<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>Travel</em></>}
    stats={[
      {count:212,suffix:'%',label:'Bookings, first quarter'},
      {count:4.2,suffix:'x',label:'Organic traffic, 90 days'},
      {count:38,suffix:'%',label:'Lower cost per acquisition'},
      {count:8,suffix:' wks',label:'End-to-end delivery'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:'A serious business hiding behind a dated storefront.', paras:["Ummah had the operations, the guides and the packages. What they didn't have was a brand that matched. Their website was a WordPress template from a decade ago, their photography was stock, and every dollar of paid media was working against a first impression it couldn't overcome.","The goal was ambitious: rebuild the identity, ship a new booking platform, and have a full performance-marketing engine running — all before Umrah season opened."], quote:"We knew we were better than how we looked. We just needed someone who could see it and ship it at the same time." },
      { label:'BEFORE / AFTER — IDENTITY', word:'Ummah.', bg:'linear-gradient(135deg, #0a4d3a 0%, #1a8a65 100%)' },
      { eyebrow:'What we did', heading:'Brand, platform, and the engine to feed it.', items:["Positioning workshop, stakeholder interviews and a customer-segmentation study across six personas.","Full visual identity: wordmark, type system, color palette rooted in desert light, photography direction.","Headless booking platform built on Next.js + Sanity, with calendar-aware package search and installment checkout.","A content system — 40 guide articles, an email welcome series, and a lifecycle retention flow.","Meta + Google paid media launch with creative rotation keyed to each persona and each package."] },
      { label:'PLATFORM — BOOKING FLOW', word:'Book. Pack. Go.', bg:'linear-gradient(135deg, #f4d03f 0%, #e8a93f 100%)' },
      { eyebrow:'The outcome', heading:'A quarter that redefined the business.', paras:["The site launched three days before the Umrah booking window opened. Within the first 90 days, organic traffic had quadrupled, bookings were up 212% year-on-year, and CAC had dropped 38% as creative started doing the work that landing-page copy couldn't do before.","More importantly: the Ummah team now runs the brand themselves. We handed over a complete system — components, templates, ad library, content playbook — and they've shipped four new campaigns since launch without us writing a line."], quote:"Digibit didn't just hand us a website — they rebuilt how we think about our brand." },
    ]}
    nav={{ prev:{href:'/work/clara',title:'Clara & Co'}, next:{href:'/work/daewoo',title:'Daewoo Battery'} }}
  />;
}
