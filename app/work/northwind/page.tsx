import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Northwind Provisions — Digibit Case Study', description: '+156% DTC revenue in one quarter: how Northwind Provisions turned a forgettable site into their strongest channel.' };
export default function CaseNorthwind() {
  return <CasePage
    title="Northwind Provisions" desc="DTC that finally worked"
    meta={{ client:'Northwind Provisions', industry:'Retail · Specialty Food', engagement:'Brand · E-comm · Content', timeline:'12 weeks', year:'2024' }}
    h1={<>A pantry brand that <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>tastes</em> as good as it looks.</>}
    lede="Northwind made some of the best small-batch preserves in the country. Their wholesale game was strong; their DTC site was a Squarespace template. We rebuilt the brand and the storefront so the taste came through online too."
    visualBg="linear-gradient(135deg, #2d1810 0%, #8b4513 60%, #d4a373 100%)"
    visualWord={<>Northwind<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>Pantry</em></>}
    stats={[
      {count:156,suffix:'%',label:'DTC revenue'},
      {count:3.2,suffix:'x',label:'Email revenue'},
      {count:89,suffix:'%',label:'Wholesale leads'},
      {count:12,suffix:'wks',label:'Rebrand to live'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:'A pantry-perfect product, hidden on a forgettable site.', paras:["Northwind's wholesale buyers loved them — restaurants, specialty grocers, gift boxes. But their DTC channel was an afterthought, despite being where their margins were strongest. The packaging looked premium; the website did not.","We were asked to rebuild the brand expression for DTC, ship a Shopify storefront that actually merchandised the catalog, and create a content engine for both DTC and wholesale buyers."], quote:"Our jars are on the table at restaurants we couldn't get reservations at. Our website was embarrassing them." },
      { label:'PACKAGING — PRESERVES LINE', word:'Northwind.', bg:'linear-gradient(135deg, #2d1810 0%, #8b4513 60%, #d4a373 100%)' },
      { eyebrow:'What we did', heading:'Brand refresh, Shopify rebuild, and a print-grade content shoot.', items:["Brand refresh: kept the iconic packaging, evolved the digital expression with editorial typography and seasonal photography.","Shopify storefront with bundled gifting, recipe pairing, and a wholesale order portal behind authentication.","A four-day editorial photo + video shoot at the production kitchen — three months of usable content.","Email automation for first-purchase, post-purchase, and abandoned cart with copy that sounds like the founders.","A monthly recipe newsletter that became their highest-revenue email channel within six months."] },
      { label:'STOREFRONT — COLLECTION', word:'Taste, packed.', bg:'linear-gradient(135deg, #d4a373 0%, #2d1810 100%)' },
      { eyebrow:'The outcome', heading:'DTC outgrew wholesale faster than anyone planned for.', paras:["DTC revenue grew 156% in the first quarter post-launch, then accelerated through the holiday gifting season. Email revenue tripled as the recipe newsletter found its rhythm. Wholesale leads from the new portal jumped 89% — turns out specialty grocers also use Google.","Six months in, Northwind hired a full-time DTC lead because the channel had grown past what the founder could run alongside production. We helped recruit her."], quote:"We finally have a website worthy of what's in the jar." },
    ]}
    nav={{ prev:{href:'/work/skynet',title:'Skynet'}, next:{href:'/work/parable',title:'Parable Foods'} }}
  />;
}
