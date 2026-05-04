import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Clara & Co — Digibit Case Study', description: '$1.2M first-year revenue, 62% organic: how we launched the Clara & Co beauty brand from notebook to shelf.' };
export default function CaseClara() {
  return <CasePage
    title="Clara & Co" desc="$1.2M Y1"
    meta={{ client:'Clara & Co', industry:'Beauty · DTC', engagement:'Brand · DTC Launch · Content', timeline:'24 weeks', year:'2022' }}
    h1={<>A beauty brand that doesn&apos;t shout to <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>be heard</em>.</>}
    lede="Clara was a perfumer with a notebook full of formulations and a clear point of view. We helped her launch the brand, the storefront, and the content engine — and watched it cross $1.2M in its first year on the strength of word-of-mouth and a brand worth talking about."
    visualBg="linear-gradient(135deg, #faf4e7 0%, #e8c4a0 60%, #b07856 100%)"
    visualWord={<>Clara<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>& Co.</em></>}
    stats={[
      {count:1.2,suffix:'M',label:'First-year revenue'},
      {count:38,suffix:'%',label:'Repeat-purchase rate'},
      {count:62,suffix:'%',label:'Organic of revenue'},
      {count:24,suffix:'wks',label:'Brand to launch'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:"A founder, a notebook, and 11 months to launch.", paras:["Clara had spent four years formulating, two years sourcing, and was about to launch with a brand that was, in her words, \"embarrassingly under-thought.\" She didn't want a shouty DTC brand. She wanted something that felt like her.","We had to translate a quiet, considered point of view into a brand system — packaging, site, content — without losing the thing that made her notebook interesting in the first place."], quote:"I don't want to launch with a brand I'll be embarrassed by in two years." },
      { label:'CLARA & CO — IDENTITY', word:'Clara & Co.', bg:'linear-gradient(135deg, #faf4e7 0%, #e8c4a0 60%, #b07856 100%)' },
      { eyebrow:'What we did', heading:'Identity, packaging, Shopify, and a launch content engine.', items:["Brand identity around editorial typography, off-white papers and a desaturated palette pulled from her formulation notes.","Packaging across 12 SKUs — three product lines, three sizes — with refill structures that worked without seeming preachy.","A Shopify storefront with quiz-based product matching and considered, slow-paced photography.","A founder-led content series — five short films, a substack-style newsletter, and a podcast plan she eventually executed.","A measured paid-media plan focused on repeat purchase and lifetime value over first-buy CAC."] },
      { label:'EDITORIAL — FILM SERIES', word:'Quietly made.', bg:'linear-gradient(135deg, #b07856 0%, #faf4e7 100%)' },
      { eyebrow:'The outcome', heading:'$1.2M year-one. 62% of it from organic.', paras:["Clara crossed $1.2M in revenue in her first 12 months. Sixty-two percent of it came from organic and word-of-mouth — a number that made her venture investors nervous (in a good way) and justified her refusal to scale paid harder.","Repeat-purchase rate hit 38% in the first year, which for a fragrance brand is a number you don't put in a deck unless you can defend it. She can."], quote:"It feels like my notebook. That's all I wanted." },
    ]}
    nav={{ prev:{href:'/work/kinetic',title:'Kinetic Labs'}, next:{href:'/work/ummah',title:'Ummah Travel'} }}
  />;
}
