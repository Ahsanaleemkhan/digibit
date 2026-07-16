/**
 * Update Brand Service with Full Content
 * Adds complete deliverables, process, case study, and FAQs
 */
import { services } from '../lib/db';

const brandServiceUpdate = {
  deliverables: [
    { num: '01', title: 'Brand audit', desc: "Where you stand today. What's working, what's noise, and what competitors are getting away with." },
    { num: '02', title: 'Positioning', desc: 'A one-sentence claim that your whole team can repeat and defend.' },
    { num: '03', title: 'Naming', desc: 'Product names, campaign names, sub-brand architecture. Done properly.' },
    { num: '04', title: 'Visual identity', desc: 'Logo, type, color, motion — a complete visual system, not a single mark.' },
    { num: '05', title: 'Voice & messaging', desc: 'How you sound, on a billboard and in a chat reply.' },
    { num: '06', title: 'Brand guidelines', desc: 'A practical playbook your team and vendors can actually follow.' }
  ],
  process_steps: [
    { num: '01', title: 'Interviews & audit', desc: 'Stakeholder interviews, customer calls, competitive mapping. We hand you the honest picture.', dur: 'WEEK 1' },
    { num: '02', title: 'Positioning workshop', desc: "A two-day off-site (or Zoom room). We leave with a positioning statement you'd bet the company on.", dur: 'WEEK 2' },
    { num: '03', title: 'Identity design', desc: 'Two visual directions, one round of refinement. No design-by-committee.', dur: 'WEEK 3–5' },
    { num: '04', title: 'System build', desc: 'Guidelines, components, templates. Everything your team needs to run without us.', dur: 'WEEK 6–7' },
    { num: '05', title: 'Launch support', desc: 'Rollout plan, internal launch kit, and an optional first campaign to put the brand to work.', dur: 'WEEK 8' }
  ],
  case_title: 'Ummah Travel — pilgrimage, reimagined.',
  case_desc: "We rebuilt Ummah Travel's positioning, identity and booking site end-to-end. Eight weeks to ship, and the results outlived the launch quarter.",
  case_stats: [
    { count: 212, suffix: '%', label: 'Booking lift' },
    { count: 4.2, suffix: 'x', label: 'Organic traffic' },
    { count: 38, suffix: '%', label: 'Lower CAC' },
    { count: 8, suffix: 'wks', label: 'To launch' }
  ],
  faqs: [
    { q: 'How much does a brand sprint cost?', a: "Most full brand sprints land between $35–85k, depending on scope (naming, sub-brands, motion, etc). We'll scope precisely after a discovery call." },
    { q: 'Do you work with early-stage startups?', a: 'Yes — we have a "Lite" version of the brand sprint tailored for pre-Series A companies that still need a serious foundation.' },
    { q: 'Can you build the website after?', a: "That's the whole point. The identity we design is the identity we ship to production, on the same engagement." },
    { q: 'What if we already have a logo?', a: 'Totally fine. Plenty of our engagements start with positioning and messaging while keeping the existing mark.' }
  ]
};

function updateBrandService() {
  console.log('🔄 Updating Brand & Strategy service with full content...\n');
  
  const brandService = services.getById('1');
  
  if (!brandService) {
    console.log('❌ Brand service not found. Run: npx tsx scripts/seed-services.ts first');
    return;
  }
  
  services.update('1', {
    ...brandService,
    ...brandServiceUpdate
  });
  
  console.log('✅ Brand & Strategy service updated with:');
  console.log(`   - ${brandServiceUpdate.deliverables.length} deliverables`);
  console.log(`   - ${brandServiceUpdate.process_steps.length} process steps`);
  console.log(`   - ${brandServiceUpdate.case_stats.length} case stats`);
  console.log(`   - ${brandServiceUpdate.faqs.length} FAQs`);
  console.log('\n✨ Service is ready to view at /services/brand-strategy\n');
}

// Run
if (require.main === module) {
  updateBrandService();
  process.exit(0);
}

export default updateBrandService;
