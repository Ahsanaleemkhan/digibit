/**
 * Test script: Verify ticker data in database
 * Run: npx tsx scripts/test-ticker.ts
 */

import { cmsContent } from '../lib/db';

async function testTickerData() {
  console.log('🧪 Testing ticker data...\n');

  try {
    const homepage = cmsContent.getByKey('homepage');
    
    if (!homepage) {
      console.error('❌ No homepage content found in database');
      process.exit(1);
    }

    const content = homepage.content;

    // Test ticker_label
    console.log('📋 Ticker Label:');
    console.log(`   ${content.ticker_label || '❌ NOT FOUND'}\n`);

    // Test ticker_items
    console.log('📊 Ticker Items:');
    if (content.ticker_items && Array.isArray(content.ticker_items)) {
      console.log(`   Found ${content.ticker_items.length} items:\n`);
      content.ticker_items.forEach((item: any, i: number) => {
        console.log(`   ${i + 1}. ${item.stat} — ${item.label}`);
      });
      console.log('\n✅ All ticker items present!');
    } else {
      console.error('   ❌ ticker_items not found or not an array');
      process.exit(1);
    }

    // Verify both label and items exist
    if (content.ticker_label && content.ticker_items && content.ticker_items.length > 0) {
      console.log('\n✅ Ticker section is fully configured!');
      console.log('   Ready to display on homepage.');
    } else {
      console.error('\n❌ Ticker section incomplete');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error testing ticker data:', error);
    process.exit(1);
  }
}

testTickerData();
