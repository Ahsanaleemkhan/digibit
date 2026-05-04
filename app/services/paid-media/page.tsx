import ServicePage from '@/components/ServicePage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Paid Media — Digibit', description: 'Meta, Google, TikTok, programmatic. We build paid media engines where creative, audience and landing pages work as one.' };

export default function PaidMedia() {
  return <ServicePage
    crumb="Paid Media"
    eyebrow="Performance marketing"
    h1={<>Paid <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>Media</em>.</>}
    lede="Meta, Google, TikTok, programmatic, connected TV. We build paid media engines where the creative rotation, audience strategy and landing pages all work as one system — not five separate vendors blaming each other."
    ctaLabel="Audit my ad account"
    visualWord={<>Every<br/>dollar <em style={{fontStyle:'italic',color:'var(--cyan-2)',fontWeight:400}}>earns</em><br/>its keep.</>}
    delTitle="The full paid-media stack."
    deliverables={[
      {num:'01',title:'Account audit',desc:"Historical account teardown. What's working, what's wasted, what to kill this week."},
      {num:'02',title:'Channel strategy',desc:'Which platforms deserve spend, why, and in what ratio. Based on your margins, not vendor kickbacks.'},
      {num:'03',title:'Creative system',desc:'Ad variants in a modular system so we can rotate 50+ creatives without bottlenecking.'},
      {num:'04',title:'Landing pages',desc:'Conversion pages built specifically for cold traffic. Shared design language with your brand.'},
      {num:'05',title:'Measurement',desc:'Server-side tracking, UTM hygiene, ROAS dashboards your CFO will actually read.'},
      {num:'06',title:'Weekly optimization',desc:'Bid adjustments, creative rotation, negative keywords. Compound wins.'},
    ]}
    procTitle="From audit to scale."
    process={[
      {num:'01',title:'Audit & intake',desc:'Full account teardown. Budget allocation hypothesis.',dur:'WEEK 1'},
      {num:'02',title:'Strategy & build',desc:'Campaign structures, audience segments, creative brief. Tracking and pixels audited.',dur:'WEEK 2'},
      {num:'03',title:'Creative sprint',desc:'15–30 ad variants shot/produced. Modular, testable, brand-safe.',dur:'WEEK 3'},
      {num:'04',title:'Launch & learn',desc:'Controlled spend, rapid iteration. The first four weeks are about finding winners.',dur:'MONTH 2'},
      {num:'05',title:'Scale',desc:'Winners scale. Losers die. New tests every two weeks.',dur:'ONGOING'},
    ]}
    caseTitle="Skynet — 42% lower CPA across $2.4M in spend."
    caseDesc="Took a Meta + Google account with 11 ad sets firing in circles. Consolidated, rebuilt the creative, rebuilt the funnel. CPA halved within 8 weeks."
    caseStats={[
      {count:42,suffix:'%',label:'Cost per acquisition ↓'},
      {count:3.4,suffix:'x',label:'ROAS'},
      {count:2.4,suffix:'M',label:'Managed spend'},
      {count:8,suffix:'wks',label:'To positive ROAS'},
    ]}
    faqs={[
      {q:"What's your minimum media spend?",a:"We take on accounts with $20k+/month in media spend. Below that, the management fee eats the delta."},
      {q:'Do you charge a % of spend?',a:"Flat monthly fee, tied to scope. We don't want our revenue going up just because your spend went up."},
      {q:'Which platforms do you run?',a:'Meta, Google (Search + YouTube + Demand Gen), TikTok, LinkedIn, programmatic via DV360, and CTV via Vibe. We recommend based on your audience, not our comfort zone.'},
      {q:'Can you fix a broken account?',a:"That's most of what we do. Most accounts we inherit are 20–40% wasted spend."},
    ]}
    ctaBottom="Stop bleeding on ads."
    ctaBottomBtn="Request an audit"
  />;
}
