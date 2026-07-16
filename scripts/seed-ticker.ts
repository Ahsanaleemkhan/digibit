/**
 * Seed script: Add ticker data to homepage content
 * Run: npx tsx scripts/seed-ticker.ts
 */

import { cmsContent } from '../lib/db';

async function seedTickerData() {
  console.log('📊 Seeding ticker data...');

  try {
    // Get existing homepage content
    const existing = cmsContent.getByKey('homepage');
    const content = existing?.content || {};

    // Add ticker fields
    content.ticker_label = '◆ Results we\'ve helped ship · 2024—2026';
    content.ticker_items = [
      { stat: '+212%', label: 'bookings · Ummah' },
      { stat: '−42%', label: 'CPA · Skynet' },
      { stat: '4.2×', label: 'organic · Ummah' },
      { stat: '+68%', label: 'leads · Daewoo' },
      { stat: '2.1×', label: 'appointments · IMC' },
      { stat: '+156%', label: 'DTC revenue · Northwind' },
      { stat: '+318%', label: 'signups · Kinetic' },
      { stat: '$1.2M', label: 'Y1 · Clara & Co' }
    ];

    // Save back to database
    cmsContent.upsert('homepage', content, 'seed-script');

    console.log('✅ Ticker data seeded successfully!');
    console.log(`   - Label: ${content.ticker_label}`);
    console.log(`   - Items: ${content.ticker_items.length} ticker items`);
  } catch (error) {
    console.error('❌ Error seeding ticker data:', error);
    process.exit(1);
  }
}

seedTickerData();
