import { blogPosts, cmsContent } from '../lib/db';

const demoPosts = [
  {
    id: '1',
    slug: 'cac-stopped-going-down',
    title: 'Why your CAC stopped going down (and what to do about it).',
    excerpt: 'The honest answer is rarely "the algorithm changed." After 47 million in managed media, here\'s our working theory.',
    featured_image: '',
    gradient_bg: 'linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)',
    category: 'Growth',
    tag: '◆ FEATURED · GROWTH',
    author_name: 'Zara Iqbal',
    author_role: 'Growth Lead',
    read_time: '12 min',
    published_date: 'Apr 18, 2026',
    content: `When your customer acquisition cost plateaus or starts climbing, the instinct is to blame the platform. "Facebook's gotten too expensive." "Google's algorithm changed." "Our CPMs doubled."

But here's what we've learned after managing $47M in paid media: the algorithm didn't change. Your audience did.

Here's the uncomfortable truth: You've exhausted the easy wins. The people who were most likely to convert have already converted. What's left is a harder-to-reach audience that needs more convincing, more touchpoints, and more trust-building before they're ready to buy.

The solution isn't to fight the platform. It's to accept that you're now in a different phase of growth.`,
    sections: [
      {
        heading: 'Phase 1: The Easy Money',
        content: 'In your first 6-12 months of paid ads, you\'re harvesting low-hanging fruit. These are people who were already close to buying. They just needed to discover you existed. Your CAC is low because you\'re not doing much convincing—you\'re just showing up at the right time.'
      },
      {
        heading: 'Phase 2: The Plateau',
        content: 'After that initial harvest, you hit a wall. Your CAC starts creeping up. Conversion rates drop. You\'re no longer reaching people who were ready to buy—you\'re reaching people who need to be convinced. This is where most brands panic and start blaming the platform.'
      },
      {
        heading: 'What Actually Works',
        content: 'Stop trying to lower your CAC through better targeting alone. Start building a system that warms cold traffic. That means: retargeting sequences that actually educate, content that builds authority before asking for the sale, and creative rotation tied to personas and intent levels. The brands that scale past this point don\'t have lower CACs—they have higher LTVs.'
      }
    ],
    meta_description: 'After managing $47M in paid media, here\'s why your CAC stopped decreasing and what successful brands do differently.',
    featured: true,
    published: true
  },
  {
    id: '2',
    slug: 'say-the-real-thing-test',
    title: 'The "say the real thing" test.',
    excerpt: 'A 2-minute exercise to pressure-test any piece of marketing copy.',
    featured_image: '',
    gradient_bg: 'linear-gradient(135deg,#ff8a5b,#1a1f5c)',
    category: 'Brand',
    tag: '◇ BRAND',
    author_name: 'Sara Nadeem',
    author_role: 'Brand Strategist',
    read_time: '6 min',
    published_date: 'Apr 12, 2026',
    content: `Most marketing copy sounds like marketing copy. It's full of jargon, empty promises, and words that mean nothing.

Here's a simple test: Read your copy out loud. If you wouldn't actually say it to someone in a conversation, it's not real. Rewrite it.`,
    sections: [
      {
        heading: 'Why This Matters',
        content: 'People can smell fake language from a mile away. When your copy sounds like it was written by a committee (or worse, by ChatGPT with no editing), you lose trust before you even get started. The brands that break through aren\'t necessarily the ones with the best product—they\'re the ones that sound like real people.'
      },
      {
        heading: 'How to Apply It',
        content: 'Take any piece of copy you\'ve written. Read it out loud. If you stumble, if it sounds awkward, or if you wouldn\'t actually say those words to a friend—cut it. Replace it with what you\'d actually say. Yes, it might sound less "professional." That\'s the point. Professional is boring. Real is memorable.'
      }
    ],
    meta_description: 'A simple 2-minute test to make your marketing copy sound like a real human wrote it.',
    featured: false,
    published: true
  },
  {
    id: '3',
    slug: 'headless-is-strategy-not-stack',
    title: 'Headless is a strategy, not a stack.',
    excerpt: 'When going headless pays off, and the expensive mistake we keep seeing.',
    featured_image: '',
    gradient_bg: 'linear-gradient(135deg,#2bb6ea,#5a4fff)',
    category: 'Engineering',
    tag: '◇ ENGINEERING',
    author_name: 'Bilal Ahmed',
    author_role: 'Tech Lead',
    read_time: '9 min',
    published_date: 'Apr 08, 2026',
    content: `Going headless isn't a technical decision. It's a business decision. And most teams make it for the wrong reasons.

Here's what we see: A brand decides to "go headless" because they heard it's faster, more flexible, or more modern. They rip out their existing CMS, hire a dev team, and six months later they have a faster site that nobody can update without a developer.`,
    sections: [
      {
        heading: 'When Headless Makes Sense',
        content: 'Headless architectures pay off when you have: Multiple frontends (web, app, kiosks), a content team that works in structured chunks (not full pages), and developers who can maintain custom tooling. If you don\'t have all three, you\'re probably better off with a traditional CMS.'
      },
      {
        heading: 'The Expensive Mistake',
        content: 'The mistake isn\'t going headless. It\'s going headless without building the content editing experience. Your marketing team shouldn\'t need a developer to update a headline. If they do, you\'ve just made your site harder to maintain, not easier. A good headless implementation includes: a visual page builder, preview environments, and content modeling that mirrors how your team actually thinks about pages.'
      }
    ],
    meta_description: 'Going headless? Here\'s when it pays off and the expensive mistake most teams make.',
    featured: false,
    published: true
  },
  {
    id: '4',
    slug: 'every-pixel-is-sentence',
    title: 'Every pixel is a sentence.',
    excerpt: 'On treating interface density as a writing problem.',
    featured_image: '',
    gradient_bg: 'linear-gradient(135deg,#a8c5a0,#1a1f5c)',
    category: 'Design',
    tag: '◇ DESIGN',
    author_name: 'Omar Farooq',
    author_role: 'Design Director',
    read_time: '5 min',
    published_date: 'Apr 05, 2026',
    content: `Designers obsess over whitespace, hierarchy, and balance. But the best designers think about density the way writers think about pacing.

Too much information on a screen, and the user drowns. Too little, and they feel like they're being dripped information one boring paragraph at a time. The right density depends on context: who the user is, what they're trying to do, and how much trust you've already built.`,
    sections: [
      {
        heading: 'Information Density as Pacing',
        content: 'A landing page for a new product should be sparse. You\'re asking for attention from someone who doesn\'t know you yet. A dashboard for a power user should be dense. They\'re there to work, not to be walked through the basics. The mistake most products make is treating every screen the same. They optimize for "clean and minimal" when what the user actually needs is "dense and efficient."'
      },
      {
        heading: 'How to Test Density',
        content: 'Ask yourself: Is this screen respecting my user\'s time? If they need to click through five steps to complete a common task, your interface isn\'t minimal—it\'s slow. On the flip side, if a first-time user feels overwhelmed, you\'ve gone too dense. The right density makes the common tasks feel effortless and the complex tasks feel manageable.'
      }
    ],
    meta_description: 'Why interface density is a writing problem, not just a design problem.',
    featured: false,
    published: true
  },
  {
    id: '5',
    slug: '90-day-retainer-outperforms',
    title: 'The 90-day retainer that outperforms year-long contracts.',
    excerpt: 'Why quarterly compounding beats annual lock-in.',
    featured_image: '',
    gradient_bg: 'linear-gradient(135deg,#1a1f5c,#2bb6ea)',
    category: 'Growth',
    tag: '◇ GROWTH',
    author_name: 'Zara Iqbal',
    author_role: 'Growth Lead',
    read_time: '7 min',
    published_date: 'Mar 28, 2026',
    content: `Most agencies sell annual retainers because it's predictable revenue. But predictable for the agency doesn't mean effective for the client.

Here's what we've learned: The best results come from 90-day sprints, not 12-month marathons. Why? Because 90 days is long enough to see real impact, but short enough to stay focused.`,
    sections: [
      {
        heading: 'Why Annual Retainers Stall',
        content: 'Annual contracts sound safe, but they encourage complacency. There\'s no urgency. No forcing function to make tough calls. Teams drift into "maintenance mode" instead of "growth mode." By month 6, you\'re optimizing for the sake of optimizing, not because there\'s a clear goal.'
      },
      {
        heading: 'How 90-Day Sprints Work',
        content: 'Every 90 days, we reset. New goals, new creative, new hypotheses. If something isn\'t working, we kill it fast. If something is working, we double down. The constraint forces clarity. It also forces us to ship, not polish. A finished v1 at day 30 beats a perfect v3 that ships at day 89.'
      }
    ],
    meta_description: 'Why 90-day retainers drive better results than annual contracts.',
    featured: false,
    published: true
  },
  {
    id: '6',
    slug: 'three-weeks-in-mecca',
    title: 'Three weeks in Mecca with a camera.',
    excerpt: 'Field notes from the Ummah Travel content shoot.',
    featured_image: '',
    gradient_bg: 'linear-gradient(135deg,#f4b942,#c41e3a)',
    category: 'Field notes',
    tag: '◇ FIELD NOTES',
    author_name: 'Mariam Shah',
    author_role: 'Content Producer',
    read_time: '8 min',
    published_date: 'Mar 22, 2026',
    content: `We spent three weeks in Saudi Arabia shooting content for Ummah Travel—a startup reimagining the pilgrimage experience for modern Muslims.

The brief was simple: Show what Hajj and Umrah actually feel like. Not the stock photos. Not the sanitized tourism brochures. The real thing.`,
    sections: [
      {
        heading: 'What We Learned',
        content: 'Shooting in Mecca during pilgrimage season is chaos. Millions of people, 45°C heat, and strict rules about where you can and can\'t film. Our original shot list lasted about two hours before we threw it out and started following the moments. The best content didn\'t come from the plan. It came from being present and ready when something real happened.'
      },
      {
        heading: 'The Content That Worked',
        content: 'The shots that ended up in the final campaign weren\'t the sweeping drone footage or the perfectly lit portraits. They were the candid moments: an elderly woman crying at the Kaaba, a father carrying his son on his shoulders through the crowd, the quiet exhaustion after Tawaf. Those moments are what sold the service—not because they were "on brand," but because they were true.'
      }
    ],
    meta_description: 'Field notes from a 3-week content shoot in Mecca for Ummah Travel.',
    featured: false,
    published: true
  }
];

const insightsPageContent = {
  hero_eyebrow: 'Insights & field notes',
  hero_heading: 'What we\'re reading, shipping and arguing about this week.',
  hero_desc: 'No growth hacks, no thought-leader sermons. Just the stuff we send each other in Slack.',
  newsletter_eyebrow: 'The monthly dispatch',
  newsletter_heading: 'The shorter, smarter agency newsletter.',
  newsletter_desc: 'One email a month. Three ideas we\'re thinking about, one thing worth reading, one thing worth watching.'
};

export async function seedBlog() {
  console.log('Seeding blog posts...');
  
  // Seed blog posts
  for (const post of demoPosts) {
    try {
      const existing = blogPosts.getById(post.id);
      if (existing) {
        blogPosts.update(post.id, post);
        console.log(`✓ Updated post: ${post.title}`);
      } else {
        blogPosts.create(post);
        console.log(`✓ Created post: ${post.title}`);
      }
    } catch (error) {
      console.error(`✗ Failed to seed post ${post.id}:`, error);
    }
  }
  
  // Seed insights page content
  try {
    cmsContent.upsert('insights', insightsPageContent);
    console.log('✓ Seeded insights page content');
  } catch (error) {
    console.error('✗ Failed to seed insights page content:', error);
  }
  
  console.log('Blog seeding complete!');
}

// Run if called directly
if (require.main === module) {
  seedBlog()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
