import ServicePage from '@/components/ServicePage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'SEO — Digibit', description: 'Technical SEO, editorial SEO, and link strategy as one engine.' };

export default function Seo() {
  return <ServicePage
    crumb="SEO"
    eyebrow="Technical + editorial"
    h1={<>Search that <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>compounds</em>.</>}
    lede="Technical SEO, editorial SEO, and link strategy as one engine. We treat search like an asset class — you invest, it compounds. We don't do shortcuts that break at the next algorithm update."
    ctaLabel="Get a site audit"
    visualWord={<>Rank<br/><em style={{fontStyle:'italic',color:'var(--cyan-2)',fontWeight:400}}>forever</em>.<br/>Not today.</>}
    delTitle="Six workstreams, one ranking."
    deliverables={[
      {num:'01',title:'Technical audit',desc:'Core Web Vitals, crawlability, index bloat, schema. 60+ checks, prioritized by impact.'},
      {num:'02',title:'Keyword strategy',desc:'Clusters mapped to intent, mapped to funnel stage. The map before the content.'},
      {num:'03',title:'Editorial calendar',desc:'Monthly themes, article briefs, internal linking plan. Writers have everything they need.'},
      {num:'04',title:'On-page optimization',desc:'Titles, headers, schema, meta, image alts. Existing pages reoptimized for 2026 SERPs.'},
      {num:'05',title:'Link strategy',desc:"Digital PR and earned links, not PBNs. Slower, but it survives."},
      {num:'06',title:'Reporting',desc:'Rankings, organic sessions, revenue attribution. Weekly Looker Studio dashboard.'},
    ]}
    procTitle="The first 90 days."
    process={[
      {num:'01',title:'Audit & benchmark',desc:'Technical, content, backlink, competitor. You get a 40-page report and a prioritized Linear board.',dur:'MONTH 1'},
      {num:'02',title:'Quick wins',desc:'Fix index bloat, Core Web Vitals, obvious on-page gaps. Rankings typically move in weeks.',dur:'MONTH 1'},
      {num:'03',title:'Content sprint',desc:'First wave of new articles, optimized existing pages. Topic authority takes shape.',dur:'MONTH 2'},
      {num:'04',title:'Link acquisition',desc:'Digital PR campaigns, resource pages, contextual placements. Quality over quantity.',dur:'MONTH 3'},
      {num:'05',title:'Compound',desc:'Monthly content, technical hygiene, authority building. The asset grows quietly.',dur:'ONGOING'},
    ]}
    caseTitle="Ummah Travel — 4.2× organic traffic in 6 months."
    caseDesc="A pilgrimage-booking site competing against giants. We rebuilt site architecture around pilgrimage intent clusters, shipped 80 editorial pieces, and watched rankings climb against 10× bigger competitors."
    caseStats={[
      {count:4.2,suffix:'x',label:'Organic traffic'},
      {count:147,suffix:'',label:'Top-3 rankings'},
      {count:62,suffix:'%',label:'Non-brand revenue'},
      {count:6,suffix:'mo',label:'To compound'},
    ]}
    faqs={[
      {q:'How quickly will I rank?',a:'Technical fixes can move rankings in days. Content competes in 3–6 months. Trust-building is a 12-month game. Anyone promising faster is selling a short squeeze.'},
      {q:'Do you do link building?',a:'Yes, but through digital PR and genuine relationships — not PBNs or sponsored posts. Slower, safer, durable.'},
      {q:'Can you write the content?',a:'We have in-house writers for most verticals, plus a vetted network for specialists (medical, legal, fintech).'},
      {q:'How do you report?',a:'Looker Studio dashboard updated daily. Monthly strategy call. We focus on revenue from organic, not just rankings.'},
    ]}
    ctaBottom="Make Google work for you."
    ctaBottomBtn="Request an audit"
  />;
}
