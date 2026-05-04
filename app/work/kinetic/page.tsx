import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Kinetic Labs — Digibit Case Study', description: '+318% organic signups and 2.7× trial-to-paid: developer-tool growth without the dev-rel theater.' };
export default function CaseKinetic() {
  return <CasePage
    title="Kinetic Labs" desc="Developer-tool growth"
    meta={{ Client:'Kinetic Labs', Industry:'SaaS · Developer Tools', Engagement:'Web · Content · SEO', Timeline:'Ongoing', Year:'2023' }}
    h1={<>Developer-tool growth, <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>without</em> the dev-rel theater.</>}
    lede="Kinetic builds infrastructure for ML teams. Their growth was stuck at the engineer-to-engineer level, and their site read like a feature list. We rebuilt their content engine and information architecture around the actual problem their users were trying to solve."
    visualBg="linear-gradient(135deg, #1a1a2e 0%, #5a4fff 60%, #ff6b9d 100%)"
    visualWord={<>Kinetic.<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>Run faster.</em></>}
    stats={[
      {count:318,suffix:'%',label:'Organic signups'},
      {count:41,suffix:'',label:'Top-3 rankings'},
      {count:2.7,suffix:'x',label:'Trial-to-paid'},
      {count:18,suffix:'mo',label:'Compounding'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:'Great product, invisible to its own audience.', paras:["Kinetic's users were finding them by accident — Hacker News, conference talks, word-of-mouth. The marketing site read like a product spec sheet, and the docs ranked higher in Google than the homepage.","We were brought in to make Kinetic discoverable, position the product against incumbents without trash-talking them, and build a content engine that engineers wouldn't hate reading."], quote:"Engineers smell marketing from a mile away. We'd rather have nothing than something that smells." },
      { label:'SITE REBUILD — DOCS-FIRST IA', word:'Kinetic.', bg:'linear-gradient(135deg, #1a1a2e 0%, #5a4fff 60%, #ff6b9d 100%)' },
      { eyebrow:'What we did', heading:'IA rebuild, technical content sprint, and an honest comparison page.', items:["Information architecture redesigned around use-cases, not features. Every nav item answers a user job.","A 26-article technical content sprint — case studies, benchmarks, deep-dives — written by engineers who actually use the platform.","A comparison page with competitors that engineers respected because it was honest about trade-offs.","A docs-to-marketing-site routing layer so search traffic landing on docs got contextual prompts to the right product page.","A technical SEO foundation: Core Web Vitals, schema, internal-linking discipline, all hosted on Vercel."] },
      { label:'CONTENT — BENCHMARK SERIES', word:'On benchmarks.', bg:'linear-gradient(135deg, #5a4fff 0%, #ff6b9d 100%)' },
      { eyebrow:'The outcome', heading:'Organic signups quadrupled. Trial-to-paid almost tripled.', paras:["In 18 months, organic signups grew 318%. The comparison page became the second-highest converting page on the site after the docs index. Trial-to-paid conversion grew 2.7× as the new positioning attracted users who needed the product, not users who were just shopping.","The compounding effect mattered most: by month 14, organic was the largest acquisition channel by spend-equivalent, and the founder stopped feeling guilty about the marketing budget."], quote:"Our users land on the site already convinced. The site just confirms they're right." },
    ]}
    nav={{ prev:{href:'/work/parable',title:'Parable Foods'}, next:{href:'/work/clara',title:'Clara & Co'} }}
  />;
}
