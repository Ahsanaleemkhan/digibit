/**
 * Seed Services Data
 * Creates default service offerings
 */
import { services } from '../lib/db';

const defaultServices = [
  {
    id: '1',
    slug: 'brand-strategy',
    title: 'Brand & Strategy',
    short_title: 'Brand',
    icon: '◆',
    category: 'Strategy',
    excerpt: 'Positioning, naming, visual identity and messaging that defines how you show up.',
    featured_image: '',
    eyebrow: 'Flagship service',
    h1_text: 'Brand & Strategy',
    lede: 'Positioning, naming, visual identity and messaging. The foundation every other marketing dollar you spend will lean on.',
    cta_label: 'Start a brand sprint',
    visual_word: 'Say the real thing.',
    deliverables_title: 'Nine deliverables, one system.',
    deliverables: [],
    process_title: 'A brand sprint, start to finish.',
    process_steps: [],
    case_title: '',
    case_desc: '',
    case_stats: [],
    case_link: '',
    faqs: [],
    cta_bottom: 'Ready to sound like yourselves?',
    cta_bottom_btn: 'Book a brand call',
    featured: true,
    homepage_order: 1,
    published: true
  },
  {
    id: '2',
    slug: 'web-design-development',
    title: 'Web Design & Development',
    short_title: 'Web',
    icon: '⌘',
    category: 'Digital',
    excerpt: 'Custom websites and web apps built for speed, conversion, and your actual business goals.',
    featured_image: '',
    eyebrow: 'Core service',
    h1_text: 'Web Design & Development',
    lede: 'Custom websites and web apps that look sharp, load fast, and actually convert visitors into customers.',
    cta_label: 'Start a web project',
    visual_word: 'Built to ship.',
    deliverables_title: 'What you get.',
    deliverables: [],
    process_title: 'From wireframe to launch.',
    process_steps: [],
    case_title: '',
    case_desc: '',
    case_stats: [],
    case_link: '',
    faqs: [],
    cta_bottom: 'Ready to ship something real?',
    cta_bottom_btn: 'Start a project',
    featured: false,
    homepage_order: 2,
    published: true
  },
  {
    id: '3',
    slug: 'paid-media',
    title: 'Paid Media & Growth',
    short_title: 'Growth',
    icon: '↗',
    category: 'Marketing',
    excerpt: 'Performance campaigns across Google, Meta, LinkedIn, and beyond. Managed in-house.',
    featured_image: '',
    eyebrow: 'Performance marketing',
    h1_text: 'Paid Media & Growth',
    lede: 'Performance campaigns that scale. Google Ads, Meta, LinkedIn — managed by people who care about ROAS, not vanity metrics.',
    cta_label: 'Get a media plan',
    visual_word: 'Growth that compounds.',
    deliverables_title: 'Full-funnel campaigns.',
    deliverables: [],
    process_title: 'How we scale.',
    process_steps: [],
    case_title: '',
    case_desc: '',
    case_stats: [],
    case_link: '',
    faqs: [],
    cta_bottom: 'Ready to turn up the dial?',
    cta_bottom_btn: 'Get started',
    featured: false,
    homepage_order: 3,
    published: true
  },
  {
    id: '4',
    slug: 'seo',
    title: 'SEO & Content',
    short_title: 'SEO',
    icon: '◎',
    category: 'Marketing',
    excerpt: 'Technical SEO, keyword strategy, and content that ranks and converts.',
    featured_image: '',
    eyebrow: 'Organic growth',
    h1_text: 'SEO & Content',
    lede: 'Technical SEO, keyword research, content strategy. The organic engine that keeps working while you sleep.',
    cta_label: 'Get an SEO audit',
    visual_word: 'Rank. Convert. Repeat.',
    deliverables_title: 'What we optimize.',
    deliverables: [],
    process_title: 'The SEO playbook.',
    process_steps: [],
    case_title: '',
    case_desc: '',
    case_stats: [],
    case_link: '',
    faqs: [],
    cta_bottom: 'Ready to own your niche?',
    cta_bottom_btn: 'Start growing',
    featured: false,
    homepage_order: 4,
    published: true
  }
];

function seedServices() {
  console.log('🌱 Seeding services...\n');
  
  defaultServices.forEach((service) => {
    const existing = services.getById(service.id);
    
    if (existing) {
      console.log(`⏭️  Service "${service.title}" already exists`);
    } else {
      services.create(service);
      console.log(`✅ Created service: ${service.title}`);
    }
  });
  
  console.log('\n✨ Services seeding complete!\n');
}

// Run if called directly
if (require.main === module) {
  seedServices();
  process.exit(0);
}

export default seedServices;
