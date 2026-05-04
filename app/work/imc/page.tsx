import CasePage from '@/components/CasePage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'IMC Hospital — Digibit Case Study', description: 'Making a hospital feel human online: 2.1× appointments and 46% lower bounce for IMC Hospital.' };
export default function CaseImc() {
  return <CasePage
    title="IMC Hospital" desc="Care, on demand"
    meta={{ Client:'IMC Hospital', Industry:'Healthcare', Engagement:'Web · App · Brand', Timeline:'16 weeks', Year:'2024' }}
    h1={<>Making a hospital feel <em style={{fontStyle:'italic',color:'var(--cyan-deep)',fontWeight:400}}>human</em> online.</>}
    lede="IMC is one of the country's busiest private hospitals. Their digital experience felt like every other hospital's: cold, confusing, and hostile to people in a hurry. We rebuilt the brand and the booking experience to feel like the place people actually trust."
    visualBg="linear-gradient(135deg, #0a3f7a 0%, #1e7bc4 60%, #e8f0fa 100%)"
    visualWord={<>IMC<br/><em style={{fontStyle:'italic',opacity:0.8,fontWeight:400}}>Care</em></>}
    stats={[
      {count:2.1,suffix:'x',label:'Appointments'},
      {count:46,suffix:'%',label:'Lower bounce'},
      {count:12,suffix:'',label:'Specialities mapped'},
      {count:16,suffix:'wks',label:'Brand to ship'},
    ]}
    sections={[
      { eyebrow:'The brief', heading:'A great hospital with a stressful website.', paras:["Patients were calling reception to do things the website should have handled in three taps. Marketing was running paid traffic to a homepage that buried the only thing anyone came for: book an appointment with the right doctor.","We were asked to overhaul the brand expression online and rebuild the patient-facing booking flow without disrupting the hospital's internal scheduling system."], quote:"Patients should not have to be calm and well-rested to use our website." },
      { label:'BRAND REFRESH — PRIMARY EXPRESSION', word:'Care, on time.', bg:'linear-gradient(135deg, #0a3f7a 0%, #1e7bc4 60%, #e8f0fa 100%)' },
      { eyebrow:'What we did', heading:'Brand refresh + booking platform + an app for follow-ups.', items:["Brand refresh: warmer typography, photography of real staff (not stock), color system tuned for medical-grade legibility.","Marketing site rebuild on Next.js with a doctor-finder by symptom, language, gender preference, and insurance coverage.","Appointment booking integrated with the hospital's HMS via a secure middleware layer.","A patient app for prescription refills, lab results, follow-ups and bill payments — built with React Native.","A doctor-portrait shoot — 78 specialists across three sites — feeding both web and app."] },
      { label:'PATIENT APP — APPOINTMENT FLOW', word:'Book in 3 taps.', bg:'linear-gradient(135deg, #1e7bc4 0%, #e8f0fa 100%)' },
      { eyebrow:'The outcome', heading:'Same number of doctors, twice the appointments.', paras:["Within 90 days, online appointments more than doubled. Bounce on the doctor-finder dropped 46%. Reception calls about scheduling — the kind that take the most staff time — dropped by a third.","The brand refresh did its quiet work too: paid creative click-through rates climbed steadily as the new identity replaced the old, and the marketing director now starts every quarterly review with the line \"the brand is doing the heavy lifting.\""], quote:"It still feels like IMC. It just feels like an IMC that respects your time." },
    ]}
    nav={{ prev:{href:'/work/daewoo',title:'Daewoo Battery'}, next:{href:'/work/skynet',title:'Skynet'} }}
  />;
}
