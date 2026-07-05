"use client";

import FAQSection from "@/components/sections/FAQSection";

const faq = [
  {
    q: "How long does SEO take?",
    a: "Most clients see meaningful ranking movement within 3-4 months. Significant revenue impact usually kicks in around months 6-12. SEO is a slow burn at first, but the gains stack up over time.",
  },
  {
    q: "Do you work with local businesses?",
    a: "Yes. Local SEO is one of our core strengths. We help local service businesses, multi-location companies, and regional brands dominate their market through Google Business Profile optimization, local citations, and location-specific content strategies.",
  },
  {
    q: "Do I need paid ads and SEO?",
    a: "It depends on your timeline and goals. SEO builds long-term assets that keep paying off for years. Paid ads generate immediate traffic. Most of our clients use both. SEO handles the long game, and ads fill the gap while SEO gains traction.",
  },
  {
    q: "How do you measure success?",
    a: "We track revenue, cost per lead, conversion rates, and pipeline value. Vanity metrics like impressions and page views get reported but never celebrated. Every strategy ties back to a business outcome you can see in your bank account.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We work across home services, healthcare, professional services, e-commerce, SaaS, and fintech. The common thread is a business that generates revenue online and wants a coordinated marketing program, not one-off tactics.",
  },
  {
    q: "What happens during a strategy call?",
    a: "We ask questions and listen. We want to understand your business model, current marketing, revenue goals, and what has or hasn't worked before. If there is a fit, we will outline a plan. If not, we will tell you honestly.",
  },
  {
    q: "Do you require long contracts?",
    a: "We prefer month-to-month engagements. If we stop delivering value, you should be able to walk away. Most clients stay long-term because the results keep building, but we earn that retention every month.",
  },
  {
    q: "How quickly can a project start?",
    a: "We take on 8-10 active clients at a time. If we have capacity, we can typically start within 1-2 weeks. If we are at capacity, we will let you know and recommend a timeline that works for both of us.",
  },
  {
    q: "What makes KINEXIS different?",
    a: "We do not sell tactics. We sell a connected revenue program. Every channel we build is linked, every recommendation is backed by data, and we keep our client roster intentionally small so your success gets the attention it deserves.",
  },
  {
    q: "How much do your services cost?",
    a: "It varies based on scope, channels, and complexity. We will give you a clear proposal after our strategy call with no hidden fees or surprise upsells. If we cannot deliver real value within your budget, we will tell you upfront.",
  },
];

export default function FAQ() {
  return (
    <FAQSection
      items={faq.map((item) => ({ question: item.q, answer: item.a }))}
    />
  );
}
