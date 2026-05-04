import ServicePage from '@/components/ServicePage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Websites & Platforms — Digibit', description: 'Marketing sites, e-commerce, and custom portals. Designed and built by the same team.' };

export default function Websites() {
  return <ServicePage
    crumb="Websites & Platforms"
    eyebrow="Design + engineering"
    h1={<>Websites &amp;<br/><em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>Platforms</em>.</>}
    lede="Marketing sites, e-commerce storefronts, and custom portals. Designed and built by the same team — which is why Digibit sites consistently score 95+ on Lighthouse and ship in weeks, not quarters."
    ctaLabel="Start a website project"
    visualWord={<>Ship<br/><em style={{fontStyle:'italic',color:'var(--cyan-2)',fontWeight:400}}>faster</em><br/>sites.</>}
    delTitle="What ships with every build."
    deliverables={[
      {num:'01',title:'Discovery & IA',desc:"Sitemap, user flows, and content model. We don't start wireframing until this is signed off."},
      {num:'02',title:'UX wireframes',desc:'Grayscale, mobile-first. Interactive Figma prototype for usability testing.'},
      {num:'03',title:'Visual design',desc:'Every page, every state. Dark mode, empty states, error states — properly designed.'},
      {num:'04',title:'Frontend build',desc:'Next.js, React, or Webflow depending on fit. Typed, accessible, fast.'},
      {num:'05',title:'CMS & integrations',desc:'Sanity, Contentful, Shopify. Your marketing team can publish without a ticket.'},
      {num:'06',title:'Launch & QA',desc:"Cross-browser, cross-device, cross-accessibility. We don't hand off broken things."},
    ]}
    procTitle="Six weeks from kickoff to launch."
    process={[
      {num:'01',title:'Discovery',desc:"Stakeholder interviews, analytics dive, competitor teardown. We find what's actually wrong before we propose a fix.",dur:'WEEK 1'},
      {num:'02',title:'Information architecture',desc:'Sitemap and content model locked. No surprise sections appear during build.',dur:'WEEK 2'},
      {num:'03',title:'Design system',desc:'Type scale, grid, components, page templates. The whole visual language in one place.',dur:'WEEK 3'},
      {num:'04',title:'Build',desc:'Component-driven development in a staging environment. You review daily.',dur:'WEEK 4–5'},
      {num:'05',title:'Launch',desc:'QA, performance tuning, SEO technicals, DNS cutover. 48-hour hypercare window after go-live.',dur:'WEEK 6'},
    ]}
    caseTitle="Ummah Travel — the booking site that actually converts."
    caseDesc="Rebuilt from a legacy stack to a headless Next.js + Sanity setup. Page weight dropped 72%, organic conversion rate more than doubled."
    caseStats={[
      {count:2.1,suffix:'x',label:'Conversion rate'},
      {count:97,suffix:'%',label:'Lighthouse score'},
      {count:72,suffix:'%',label:'Lighter pages'},
      {count:6,suffix:'wks',label:'To launch'},
    ]}
    faqs={[
      {q:'How much does a site cost?',a:'Marketing sites typically $40–120k. E-commerce and custom platforms $80–250k+. We scope precisely after a discovery call.'},
      {q:'Webflow, Next.js, or something else?',a:"We pick the stack that fits your team. If your marketers will edit weekly, Webflow or Sanity. If it's app-like, Next.js with a headless CMS."},
      {q:'Do you host it too?',a:'We can, or we hand off to Vercel / Netlify / your cloud. Most clients choose Vercel because it\'s frictionless.'},
      {q:'Will it be accessible?',a:'WCAG 2.2 AA is our baseline, not an add-on. We test with screen readers and keyboard nav before shipping.'},
    ]}
    ctaBottom="Ready for a site that ships?"
    ctaBottomBtn="Book a build call"
  />;
}
