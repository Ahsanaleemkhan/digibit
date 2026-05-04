import ServicePage from '@/components/ServicePage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics & CRO — Digibit', description: 'GA4, Mixpanel, server-side tagging, experimentation. The feedback loop that turns a site into a compounding asset.' };

export default function Analytics() {
  return <ServicePage
    crumb="Analytics & CRO"
    eyebrow="Measurement + experimentation"
    h1={<>Analytics &amp; <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>CRO</em>.</>}
    lede="GA4, Mixpanel, server-side tagging, experimentation. The feedback loop that turns a site into a compounding asset. Most analytics setups we inherit are broken in at least three places."
    ctaLabel="Audit my analytics"
    visualWord={<>Data<br/>that <em style={{fontStyle:'italic',color:'var(--cyan-2)',fontWeight:400}}>earns</em><br/>its keep.</>}
    delTitle="The full measurement stack."
    deliverables={[
      {num:'01',title:'Analytics audit',desc:'GA4, GTM, pixel health. We find what\'s firing wrong, what\'s missing, what\'s lying to you.'},
      {num:'02',title:'Server-side tracking',desc:'First-party data, cookieless measurement. Your numbers stay accurate post-iOS updates.'},
      {num:'03',title:'Dashboard build',desc:'Looker Studio or Mixpanel. Revenue-focused, not vanity-metric-focused.'},
      {num:'04',title:'CRO research',desc:'Heatmaps, session recordings, user interviews, funnel analysis. We find the friction before we guess at fixes.'},
      {num:'05',title:'A/B testing',desc:'Hypothesis-driven tests with statistical significance requirements. No more HiPPO decisions.'},
      {num:'06',title:'Experimentation roadmap',desc:'A rolling 90-day pipeline of tests, ranked by expected lift × confidence × effort.'},
    ]}
    procTitle="From broken tracking to compounding wins."
    process={[
      {num:'01',title:'Audit',desc:'GA4 configuration, GTM container, pixel health, data layer. We find every gap.',dur:'WEEK 1'},
      {num:'02',title:'Fix & rebuild',desc:'Server-side setup, consent mode, clean data layer. Tracking you can trust.',dur:'WEEK 2–3'},
      {num:'03',title:'Dashboard',desc:'Revenue-first reporting. The right numbers in the right hands.',dur:'WEEK 4'},
      {num:'04',title:'CRO research',desc:'Qualitative + quantitative: heatmaps, sessions, interviews, funnel teardown.',dur:'MONTH 2'},
      {num:'05',title:'Test & iterate',desc:'First test live. Two-week test cycles. Results compound over quarters.',dur:'ONGOING'},
    ]}
    caseTitle="Clara & Co — 2.4× checkout conversion in 90 days."
    caseDesc="A DTC beauty brand tracking revenue with broken attribution. We rebuilt tracking server-side, identified a 3-step checkout drop-off, ran two tests, and doubled conversion before the next peak season."
    caseStats={[
      {count:2.4,suffix:'x',label:'Checkout conversion'},
      {count:38,suffix:'%',label:'Less wasted ad spend'},
      {count:90,suffix:'days',label:'To measurable lift'},
      {count:12,suffix:'',label:'Tests in first quarter'},
    ]}
    faqs={[
      {q:'Our GA4 is a mess. Can you fix it?',a:"That's the most common thing we're asked. Yes — we do a full rebuild, not a patch job."},
      {q:'Do you handle consent and GDPR?',a:'Yes. Consent mode v2, server-side first-party tracking, and geo-based consent logic baked in.'},
      {q:'What testing tool do you use?',a:'Depends on stack. VWO, Optimizely, or native Next.js feature flags for engineering-heavy clients.'},
      {q:'How long before we see results?',a:'Tracking fixes are immediate. CRO lifts compound over 3–6 months of testing. We show lift from test 1.'},
    ]}
    ctaBottom="Make your data tell the truth."
    ctaBottomBtn="Request an analytics audit"
  />;
}
