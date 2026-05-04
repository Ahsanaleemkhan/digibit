import ServicePage from '@/components/ServicePage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Production & Content — Digibit', description: 'Photo, video, motion, copy. The fuel line for everything you publish.' };

export default function Production() {
  return <ServicePage
    crumb="Production & Content"
    eyebrow="Creative production"
    h1={<>Production &amp; <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>Content</em>.</>}
    lede="Photo, video, motion, copy. The fuel line for everything you publish — ads, social, site, campaigns. In-house production means no briefing a third party, no lost-in-translation, no missed brand voice."
    ctaLabel="Book a production day"
    visualWord={<>Made<br/>with <em style={{fontStyle:'italic',color:'var(--cyan-2)',fontWeight:400}}>craft</em><br/>not AI.</>}
    delTitle="From brief to finished asset."
    deliverables={[
      {num:'01',title:'Photography',desc:'Studio and on-location. Product, lifestyle, team, editorial. We direct and deliver.'},
      {num:'02',title:'Video production',desc:'30s to 10min. Brand films, testimonials, product demos, social reels.'},
      {num:'03',title:'Motion & animation',desc:'Logo animations, UI explainers, ad cuts, social loops. Rigged for re-use.'},
      {num:'04',title:'Copywriting',desc:'Landing page copy, email sequences, brand storytelling. One voice, everywhere.'},
      {num:'05',title:'UGC & testimonials',desc:'Managed testimonial capture with real customers. Scripted enough to convert, raw enough to trust.'},
      {num:'06',title:'Asset management',desc:'Organized, tagged, stored. Every asset findable by your team in seconds.'},
    ]}
    procTitle="From brief to deliverables."
    process={[
      {num:'01',title:'Creative brief',desc:'Goals, audiences, platforms, tone, mood references. The brief is the work.',dur:'WEEK 1'},
      {num:'02',title:'Pre-production',desc:'Shot list, talent, locations, props, styling. We over-prepare so shoot day runs.',dur:'WEEK 2'},
      {num:'03',title:'Shoot day(s)',desc:'Efficient, directed, on-brief. Typically 60–100 usable assets per day.',dur:'WEEK 3'},
      {num:'04',title:'Post-production',desc:'Edit, color, sound, motion. Two rounds of revision.',dur:'WEEK 4'},
      {num:'05',title:'Delivery',desc:'Formatted for every platform. Organized in your asset library.',dur:'WEEK 5'},
    ]}
    caseTitle="Northwind Provisions — 156% DTC lift from one shoot."
    caseDesc="Northwind was running paid ads with product-on-white stock photos. We shot one lifestyle day — 80 assets across 4 product lines — and rebuilt their ad creative. Revenue doubled in 90 days."
    caseStats={[
      {count:156,suffix:'%',label:'DTC revenue lift'},
      {count:80,suffix:'+',label:'Assets, one day'},
      {count:3.8,suffix:'x',label:'Ad ROAS improvement'},
      {count:90,suffix:'days',label:'To results'},
    ]}
    faqs={[
      {q:'How much does a production day cost?',a:'Studio days from $6k, on-location from $8k. Includes full crew, post-production, and final delivery.'},
      {q:'Do you provide talent and locations?',a:'Yes — we have a casting and location network. Or we can work with yours.'},
      {q:'Can you produce for international markets?',a:"We shoot in Pakistan, UAE and Canada, and travel globally for large productions."},
      {q:'Do we own the assets?',a:'100%. All raw files and finals transfer to you on completion.'},
    ]}
    ctaBottom="Got a brief? Let's make it."
    ctaBottomBtn="Book a production call"
  />;
}
