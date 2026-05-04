import ServicePage from '@/components/ServicePage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Social & Content — Digibit', description: 'Calendars that actually get filled. Photo, video, motion and copy produced in-house.' };

export default function SocialContent() {
  return <ServicePage
    crumb="Social & Content"
    eyebrow="Social + content production"
    h1={<>Social &amp; <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>Content</em>.</>}
    lede="Calendars that actually get filled. Photo, video, motion and copy — produced in-house so it doesn't bottleneck. We own the content engine so you can run it without chasing freelancers."
    ctaLabel="Build my content engine"
    visualWord={<>Content<br/><em style={{fontStyle:'italic',color:'var(--cyan-2)',fontWeight:400}}>that</em><br/>moves.</>}
    delTitle="Every piece of the content engine."
    deliverables={[
      {num:'01',title:'Content strategy',desc:'Audience personas, platform mix, content pillars. The why before the what.'},
      {num:'02',title:'Editorial calendar',desc:'60-day rolling calendar, scheduled and briefed. No more scrambling on Monday morning.'},
      {num:'03',title:'Photo & video',desc:'Studio or on-location shoots. Social cuts, reels, stills — all from one production day.'},
      {num:'04',title:'Copywriting',desc:'Captions, long-form, email. One voice, everywhere, consistently.'},
      {num:'05',title:'Community management',desc:'Replies, DMs, comments — with a tone guide so it sounds like you, not a VA.'},
      {num:'06',title:'Performance reporting',desc:"Monthly analytics: reach, saves, link clicks, follower quality. We cut what doesn't earn."},
    ]}
    procTitle="60 days to a full content operation."
    process={[
      {num:'01',title:'Audit & strategy',desc:"Existing content teardown, competitor benchmarking, pillar definition. We find what's already working.",dur:'WEEK 1–2'},
      {num:'02',title:'First shoot',desc:'Brand content library built. 30–60 assets usable across all platforms.',dur:'WEEK 3'},
      {num:'03',title:'Calendar live',desc:'First 30 days of posts scheduled. Captions reviewed and approved.',dur:'WEEK 4'},
      {num:'04',title:'Cadence',desc:'Weekly publishing rhythm locked. Monthly shoots. Quarterly strategy reviews.',dur:'ONGOING'},
    ]}
    caseTitle="Parable Foods — from 0 to 48k in 6 months."
    caseDesc="A premium food brand launching into retail needed social proof before they had shelf space. We built the content engine from scratch — strategy, shoots, and community — and grew their audience faster than their distribution."
    caseStats={[
      {count:48,suffix:'k',label:'Followers, 6 months'},
      {count:6.8,suffix:'%',label:'Avg. engagement rate'},
      {count:14,suffix:'',label:'Countries reached'},
      {count:3,suffix:'x',label:'Retail sell-through'},
    ]}
    faqs={[
      {q:'How many posts per month?',a:"Depends on the plan — typically 12–20 on Instagram, 4–8 on LinkedIn. We prioritize quality over volume."},
      {q:'Do you manage the accounts or just create content?',a:'Both options available. Most clients have us manage end-to-end including community management.'},
      {q:'Do you film locally or can you travel?',a:"We're based in Lahore, Dubai, and Toronto. We travel for shoots globally — travel costs added at cost."},
      {q:"What if we don't like a post?",a:'Two rounds of feedback included on every piece. We build a tone guide so edits get rarer over time.'},
    ]}
    ctaBottom="Ready for a content engine that actually runs?"
    ctaBottomBtn="Let's talk content"
  />;
}
