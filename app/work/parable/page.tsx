import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Parable Foods — Digibit Case Study', description: '14 countries, $8.4M Series A: how we built the Parable Foods brand from naming to first export shipment in 20 weeks.' };
export default function CaseParable() {
  return <CasePage
    title="Parable Foods" desc="Plant-based without the preachiness"
    meta={{ Client:'Parable Foods', Industry:'Food · CPG', Engagement:'Brand · Packaging · Web', Timeline:'20 weeks', Year:'2023' }}
    h1={<>Plant-based food without the <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>preachy</em> brand.</>}
    lede="Parable was building the next category-leading plant-based brand. They had the products and the science — what they needed was a brand that didn't sound like every other plant-based brand. We built the identity from naming through to the first 14 export markets."
    visualBg="linear-gradient(135deg, #3d5a3a 0%, #8fb08a 60%, #f0e8d5 100%)"
    visualWord={<>Parable.<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>Plant-based.</em></>}
    stats={[
      {count:14,suffix:'',label:'Countries at launch'},
      {count:8.4,suffix:'M',label:'Series A raised'},
      {count:312,suffix:'%',label:'Direct trade leads'},
      {count:20,suffix:'wks',label:'End to end'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:'A new category in a crowded shelf.', paras:["Parable had finalized formulations and was 12 weeks from first export shipments when we joined. The internal \"brand\" was a placeholder Google Doc. They needed naming, identity, packaging, website and trade collateral — all production-ready, all in one voice — before container ships left port.","We had to deliver a brand that worked equally well on a Whole Foods shelf in Brooklyn and a Carrefour in Dubai, in three languages, without ever sounding worthy."], quote:"Make us the brand that doesn't make people roll their eyes." },
      { label:'PACKAGING SYSTEM — 9 SKUS', word:'Parable.', bg:'linear-gradient(135deg, #3d5a3a 0%, #8fb08a 60%, #f0e8d5 100%)' },
      { eyebrow:'What we did', heading:'Naming, identity, packaging, site, trade kit.', items:["Naming sprint that ended with \"Parable\" — a name that carried meaning without sermonizing.","A modular packaging system across 9 SKUs in three temperature zones, designed for shelf legibility at three meters.","A wordmark and visual language built around contour line drawings — warm, hand-drawn, food-first.","Marketing site on Webflow with a CMS-driven trade portal in five languages.","A 60-page trade kit, an investor deck, and a launch film — all shipped 11 days before the first container left."] },
      { label:'PARABLE — LAUNCH FILM', word:'On the table.', bg:'linear-gradient(135deg, #8fb08a 0%, #3d5a3a 100%)' },
      { eyebrow:'The outcome', heading:'Shelves in 14 countries. Series A in five months.', paras:["Parable hit shelves in 14 countries on schedule. The brand carried its weight in trade meetings — direct trade leads up 312% in the first quarter compared to the placeholder presence. Five months later they closed an $8.4M Series A with the brand kit doing real work in the deck.","They've since launched two new product lines on the same system without coming back to us — which is, by our scoreboard, the best possible outcome."], quote:"Investors quoted our brand book back to us. That doesn't happen by accident." },
    ]}
    nav={{ prev:{href:'/work/northwind',title:'Northwind Provisions'}, next:{href:'/work/kinetic',title:'Kinetic Labs'} }}
  />;
}
