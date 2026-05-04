import ServicePage from '@/components/ServicePage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mobile Apps — Digibit', description: 'iOS, Android, and cross-platform apps. We design, build, ship — and then run the marketing.' };

export default function Mobile() {
  return <ServicePage
    crumb="Mobile Apps"
    eyebrow="Native & cross-platform"
    h1={<>Mobile <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>Apps</em>.</>}
    lede="iOS, Android, and cross-platform apps. We design, build, ship — and then run the marketing that actually drives installs and retention."
    ctaLabel="Scope a mobile project"
    visualWord={<>Apps<br/>that <em style={{fontStyle:'italic',color:'var(--cyan-2)',fontWeight:400}}>stick</em><br/>around.</>}
    delTitle="What we build, end to end."
    deliverables={[
      {num:'01',title:'Product strategy',desc:'JTBD, feature prioritization, monetization model. What belongs in v1 and what waits.'},
      {num:'02',title:'UX prototype',desc:'Clickable Figma prototype tested with 5+ real users before a line of code is written.'},
      {num:'03',title:'Visual design',desc:"Native patterns, not web-in-a-webview. iOS and Android feel native on their own terms."},
      {num:'04',title:'App build',desc:'React Native or Swift/Kotlin depending on complexity. Fully typed, fully tested.'},
      {num:'05',title:'Backend & APIs',desc:'Supabase, Firebase, or bespoke Node. Auth, push, payments, analytics wired in.'},
      {num:'06',title:'Launch & ASO',desc:'App Store Optimization, store listings, screenshots, launch campaign. The install funnel matters too.'},
    ]}
    procTitle="Twelve weeks to TestFlight."
    process={[
      {num:'01',title:'Product definition',desc:'User research, feature spec, success metrics. We ship v1, not v4.',dur:'WEEK 1–2'},
      {num:'02',title:'Prototype & test',desc:"Figma prototype in testers' hands. We find the rough edges before code.",dur:'WEEK 3–4'},
      {num:'03',title:'Design & architecture',desc:'Native UI system, backend schema, API contracts. Engineering and design in lockstep.',dur:'WEEK 5–6'},
      {num:'04',title:'Sprint build',desc:'Two-week sprints with demoable builds in TestFlight / Play internal.',dur:'WEEK 7–10'},
      {num:'05',title:'Beta & launch',desc:"Closed beta, iteration, store submission. App Review is our problem, not yours.",dur:'WEEK 11–12'},
    ]}
    caseTitle="Skynet — delivery app that saved itself $42/install."
    caseDesc="Rebuilt a performance-dragging hybrid app as a native React Native experience. Install-to-first-order conversion tripled, and acquisition cost dropped 42%."
    caseStats={[
      {count:3.1,suffix:'x',label:'Install conversion'},
      {count:42,suffix:'%',label:'Cost per install ↓'},
      {count:4.8,suffix:'★',label:'App Store rating'},
      {count:12,suffix:'wks',label:'To v1'},
    ]}
    faqs={[
      {q:'React Native or native Swift/Kotlin?',a:"Depends on your roadmap. 80% of apps we build are React Native — 20% need native-native because of performance-critical paths."},
      {q:'Do you handle the App Store submission?',a:'Yes. We manage the full submission, review cycle, and any rejection appeals.'},
      {q:'Can you integrate with our existing backend?',a:"Absolutely. We've integrated with everything from Rails monoliths to serverless Supabase. Bring your APIs."},
      {q:'What about ongoing maintenance?',a:'We offer month-to-month retainers for iOS/Android updates, bug fixes, and feature additions after launch.'},
    ]}
    ctaBottom="App in your head, shipping in 12 weeks."
    ctaBottomBtn="Start the scope"
  />;
}
