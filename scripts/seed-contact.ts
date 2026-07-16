import { cmsContent } from '../lib/db';

const contactPageContent = {
  hero_eyebrow: 'Let\'s start something',
  hero_heading: 'Tell us about your brand.',
  hero_subheading: 'We\'ll reply within 24 hours.',
  email: 'hello@digibit.co',
  phone: '+1 (415) 555-0142',
  offices: [
    { 
      label: 'Lahore HQ', 
      address: '27 Gulberg Ave\nLahore, Pakistan' 
    },
    { 
      label: 'Dubai', 
      address: 'Al Quoz Creative Zone\nDubai, UAE' 
    },
    { 
      label: 'Toronto', 
      address: '312 Adelaide W\nToronto, Canada' 
    }
  ],
  form_services: [
    'Brand',
    'Website',
    'Mobile App',
    'Paid Media',
    'Social',
    'SEO',
    'Content',
    'Not sure yet'
  ],
  success_heading: 'Got it. Thanks.',
  success_message: 'We\'ll read it this afternoon and reply within 24 hours.'
};

export async function seedContact() {
  console.log('Seeding contact page...');
  
  try {
    cmsContent.upsert('contact', contactPageContent);
    console.log('✓ Seeded contact page content');
  } catch (error) {
    console.error('✗ Failed to seed contact page content:', error);
  }
  
  console.log('Contact page seeding complete!');
}

// Run if called directly
if (require.main === module) {
  seedContact()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
