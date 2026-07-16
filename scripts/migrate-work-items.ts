/**
 * Migration script: Populate default work items into database
 * Run with: npx tsx scripts/migrate-work-items.ts
 */
import { workItems } from '../lib/db';
import fs from 'fs';
import path from 'path';

const defaultWorkItems = [
  {
    id: "1",
    slug: "ummah-travel",
    title: "Ummah Travel — pilgrimage, reimagined",
    category: "Travel · Brand · Web",
    excerpt: "A modern platform transforming the pilgrimage booking experience with seamless UX and cultural sensitivity.",
    featured_image: "",  // No image by default - admin can upload
    client: "Ummah Travel",
    year: "2025",
    services: ["Brand Strategy", "Web Design", "Development", "SEO", "Paid Media"],
    challenge: "Ummah Travel needed to modernize their pilgrimage booking experience while maintaining cultural sensitivity and trust. The existing platform was outdated, conversion rates were low, and customer acquisition costs were high.",
    solution: "We rebuilt the entire digital experience from the ground up. New brand positioning that emphasized trust and expertise. A redesigned booking flow that reduced friction by 60%. Integrated social proof throughout the journey. Launched targeted paid media campaigns across Meta and Google with culturally relevant creative.",
    results: [
      "+212% increase in bookings",
      "4.2× growth in organic traffic",
      "38% lower customer acquisition cost",
      "2.3× improvement in conversion rate"
    ],
    gallery_images: [],
    testimonial_quote: "Digibit didn't just hand us a website — they rebuilt how we think about our brand. Bookings are up 212% and we finally sound like ourselves online.",
    testimonial_author: "Amira Qadri",
    testimonial_role: "Marketing Director · Ummah Travel",
    published: true
  },
  {
    id: "2",
    slug: "daewoo-battery",
    title: "Daewoo Battery — charging ahead",
    category: "Industrial · Growth",
    excerpt: "Repositioning an industrial battery manufacturer for B2B growth with data-driven demand generation.",
    featured_image: "",  // No image by default - admin can upload
    client: "Daewoo Battery",
    year: "2025",
    services: ["Paid Media", "Lead Generation", "Content Strategy", "Analytics"],
    challenge: "Daewoo Battery had strong products but struggled with digital visibility in a competitive B2B market. Their lead generation was inconsistent and heavily dependent on trade shows. They needed a scalable digital channel.",
    solution: "We developed a comprehensive demand generation strategy. Created technical content targeting decision-makers at key accounts. Launched LinkedIn and Google campaigns with precise targeting. Built automated nurture sequences. Implemented advanced analytics to track full-funnel performance.",
    results: [
      "+68% qualified leads generated",
      "43% reduction in cost per lead",
      "2.1× increase in sales pipeline",
      "$2.3M in attributed revenue (first 6 months)"
    ],
    gallery_images: [],
    testimonial_quote: "The team understood our technical audience and delivered campaigns that actually converted. Our sales team now has more qualified leads than they can handle.",
    testimonial_author: "James Park",
    testimonial_role: "VP of Marketing · Daewoo Battery",
    published: true
  },
  {
    id: "3",
    slug: "imc-hospital",
    title: "IMC Hospital — care, on demand",
    category: "Healthcare · Web · App",
    excerpt: "Building a patient-first digital ecosystem for one of Pakistan's leading healthcare providers.",
    featured_image: "",  // No image by default - admin can upload
    client: "IMC Hospital",
    year: "2024",
    services: ["Web Design", "Mobile App", "Patient Portal", "UX Research"],
    challenge: "IMC Hospital wanted to improve patient experience through digital channels. Appointment booking was phone-based and inefficient. Patients had no way to access records or communicate with doctors online. The existing website was outdated and not mobile-friendly.",
    solution: "We designed and built a complete patient portal with online appointment booking, medical records access, prescription tracking, and secure messaging. Developed iOS and Android apps. Created a responsive website optimized for mobile. Integrated with existing hospital management systems.",
    results: [
      "2.1× increase in appointment bookings",
      "67% of appointments now booked online",
      "4.6 star app rating (10k+ reviews)",
      "35% reduction in call center volume"
    ],
    gallery_images: [],
    testimonial_quote: "Digibit transformed our patient experience. The app and portal are exactly what we needed, and our patients love them.",
    testimonial_author: "Dr. Sarah Ahmed",
    testimonial_role: "Chief Digital Officer · IMC Hospital",
    published: true
  },
  {
    id: "4",
    slug: "skynet-telecom",
    title: "Skynet — going national",
    category: "Telecom · Paid Media",
    excerpt: "Scaling a regional ISP to national presence through performance marketing and brand campaigns.",
    featured_image: "",  // No image by default - admin can upload
    client: "Skynet Telecom",
    year: "2024",
    services: ["Paid Media", "Creative Strategy", "Brand Campaigns", "Performance Marketing"],
    challenge: "Skynet was launching in 12 new cities and needed to build awareness fast. They were competing against established national players with much larger budgets. Customer acquisition costs needed to stay below ₹2,500 per subscriber.",
    solution: "We developed a hybrid brand and performance strategy. Created city-specific creative that highlighted local market advantages. Launched integrated campaigns across Meta, Google, TikTok, and outdoor. Optimized for both reach and conversion. Scaled spend from ₹2M to ₹18M per month while maintaining efficiency.",
    results: [
      "−42% customer acquisition cost",
      "3× increase in monthly subscribers",
      "89% of target achieved in 6 months",
      "₹18M/month media managed at scale"
    ],
    gallery_images: [],
    testimonial_quote: "Digibit helped us punch above our weight. We competed with the big players and won in market after market.",
    testimonial_author: "Ahmed Hassan",
    testimonial_role: "CMO · Skynet Telecom",
    published: true
  }
];

console.log('🚀 Starting work items migration...\n');

let successCount = 0;
let errorCount = 0;

for (const item of defaultWorkItems) {
  try {
    // Check if item already exists
    const existing = workItems.getById(item.id);
    
    if (existing) {
      console.log(`✓ Work item "${item.title}" already exists (skipping)`);
    } else {
      workItems.create(item);
      console.log(`✓ Created work item: ${item.title}`);
      successCount++;
    }
  } catch (error: any) {
    console.error(`✗ Failed to create "${item.title}": ${error.message}`);
    errorCount++;
  }
}

console.log(`\n✅ Migration complete!`);
console.log(`   • ${successCount} work items created`);
console.log(`   • ${errorCount} errors`);
console.log(`   • ${successCount + errorCount} total processed\n`);
