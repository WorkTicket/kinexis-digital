import type { FAQItem } from "@/components/sections/FAQSection";

export type LocationDetailContent = {
  answerBlock: string;
  marketInsight: string;
  industries: string[];
  localFaqs: FAQItem[];
};

export const locationDetails: Record<string, LocationDetailContent> = {
  toronto: {
    answerBlock:
      "KINEXIS provides digital marketing for Toronto businesses in SaaS, professional services, and healthcare. Typical Google Ads CPC for B2B professional services in the GTA runs $8 to $22 per click. SEO retainers start at $3,500 per month for competitive Toronto keywords. Most clients see local and organic traction within 90 days when content targets GTA-specific search intent.",
    marketInsight:
      "Toronto's marketing market is crowded with agencies, but most compete on generic retainers rather than vertical expertise. SaaS and professional services firms here search for partners who understand longer sales cycles and multi-stakeholder buying committees.",
    industries: ["SaaS and technology", "Professional services and law", "Healthcare and dental", "Real estate and property management"],
    localFaqs: [
      { question: "How much does SEO cost in Toronto?", answer: "Most Toronto SEO engagements run $3,500 to $8,000 per month depending on competition. Professional services and SaaS keywords in the GTA are more expensive to rank for than suburban service trades." },
      { question: "Do you work with Toronto startups?", answer: "Yes. We run content, paid search, and funnel builds for seed to Series B companies in the GTA, often combining product-led content with Google Ads for high-intent comparison terms." },
      { question: "How long does local SEO take in Toronto?", answer: "Map pack movement for single-location service businesses usually starts around 60 to 90 days. Organic rankings for competitive Toronto keywords often need 4 to 6 months of consistent work." },
      { question: "What industries do you focus on in Toronto?", answer: "SaaS, professional services, healthcare, and real estate make up most of our Toronto client base. We also work with home services brands serving the broader GTA." },
    ],
  },
  dallas: {
    answerBlock:
      "KINEXIS serves Dallas-Fort Worth businesses in home services, construction, and healthcare. Average Google Ads CPC for HVAC and contractor keywords in DFW runs $12 to $45 per click depending on season. Local SEO programs for trades businesses typically start at $2,500 per month. We have case study data showing +340% organic traffic growth for landscaping and home services clients in Texas markets.",
    marketInsight:
      "DFW's population growth drives constant demand for contractors, landscapers, and home services. Competition on Google Local Services Ads is fierce in Plano, Frisco, and McKinney. Businesses that combine map pack SEO with paid search capture both emergency and research-intent buyers.",
    industries: ["Contractors and home services", "Construction and roofing", "Healthcare and dental", "Real estate"],
    localFaqs: [
      { question: "How much does SEO cost in Dallas?", answer: "Local and organic SEO for DFW service businesses typically runs $2,500 to $6,000 per month. Contractor keywords cost more to rank for than less competitive suburban trades." },
      { question: "Do contractors in Dallas need Google Ads?", answer: "Most successful contractors run Google Ads for immediate calls while building local SEO for map pack presence. Seasonal demand for AC and heating makes paid search especially valuable in Texas." },
      { question: "How long does local SEO take in Dallas?", answer: "Google Business Profile optimization and citations often show map pack movement in 60 to 90 days. Broader organic rankings for competitive DFW terms need 4 to 6 months." },
      { question: "Do you serve the full DFW metro?", answer: "Yes. We build campaigns for Dallas, Fort Worth, Plano, Frisco, Arlington, and surrounding cities with location-specific landing pages where it makes sense." },
    ],
  },
  austin: {
    answerBlock:
      "KINEXIS works with Austin tech startups, professional services, and local trades. Google Ads CPC for SaaS and tech keywords in Austin averages $6 to $18 per click. Web design projects for Austin startups typically range from $12,000 to $28,000. The market rewards brands that move fast on content and paid acquisition while competition for generic agency terms stays moderate compared to coastal cities.",
    marketInsight:
      "Austin's tech scene creates strong demand for product-led marketing, comparison content, and paid search for demo requests. Local service businesses compete against a flood of new residents searching for contractors, dentists, and home services for the first time.",
    industries: ["SaaS and tech startups", "Professional services", "Home services and trades", "Healthcare"],
    localFaqs: [
      { question: "How much does digital marketing cost in Austin?", answer: "SEO retainers start around $2,500 per month. Google Ads management runs $2,500 to $5,000 per month plus ad spend. Web builds for startups typically start at $12,000 for a conversion-focused site." },
      { question: "Do you work with Austin SaaS companies?", answer: "Yes. We build content clusters, comparison pages, and paid search campaigns tuned to trial and demo conversion for B2B SaaS in Austin." },
      { question: "How competitive is SEO in Austin?", answer: "Tech and SaaS terms are moderately competitive. Local service keywords are less saturated than Dallas or Houston but growing quickly as the metro expands." },
      { question: "Can you help Austin businesses targeting multiple Texas cities?", answer: "Yes. We often build location pages and ad campaigns for Austin HQ brands expanding into Dallas, Houston, and San Antonio." },
    ],
  },
  bogota: {
    answerBlock:
      "KINEXIS supports Bogotá businesses expanding into North American markets and local brands targeting Colombian search. Spanish and bilingual SEO programs start at $2,000 per month. Google Ads CPC for professional services in Bogotá averages $0.80 to $3.50 per click, significantly lower than US metros. We help export-ready firms build English-language sites and campaigns for US and Canadian buyer intent.",
    marketInsight:
      "Bogotá has a growing BPO, fintech, and professional services sector with increasing competition on Google and Meta. Companies selling into the US often need bilingual sites, proper hreflang setup, and separate campaigns for Colombian vs. international buyers.",
    industries: ["Fintech and BPO", "Professional services", "E-commerce and retail", "Healthcare"],
    localFaqs: [
      { question: "¿Cuánto cuesta el SEO en Bogotá?", answer: "Los planes SEO bilingües para Bogotá suelen empezar en $2,000 al mes. La competencia es menor que en ciudades de EE.UU., pero los términos financieros y BPO se están poniendo más caros." },
      { question: "Do you offer bilingual marketing for Bogotá companies?", answer: "Yes. We build Spanish and English content, hreflang structures, and separate ad campaigns for local Colombian buyers vs. US and Canada export markets." },
      { question: "How long does SEO take in Bogotá?", answer: "Local map pack and organic results often move faster than US metros because competition is lower. Most clients see meaningful traction in 60 to 120 days." },
      { question: "Can you help Bogotá firms enter the US market?", answer: "Yes. We build English-language sites, US-targeted Google Ads, and content that matches how American buyers search for your category." },
    ],
  },
  "cedar-falls": {
    answerBlock:
      "KINEXIS serves Cedar Falls and the Waterloo-Cedar Falls metro with SEO, Google Ads, and web design for local service businesses, healthcare, and professional firms. Iowa markets have lower CPC than coastal cities, which makes paid search efficient while SEO builds long-term visibility across the Cedar Valley.",
    marketInsight:
      "The Cedar Valley combines university-driven demand with steady home services needs. Local businesses compete against Des Moines and Cedar Rapids agencies pitching remote service. On-the-ground market knowledge and Iowa-specific case studies matter here.",
    industries: ["Home services", "Healthcare", "Professional services", "Retail"],
    localFaqs: [
      { question: "Do you work with Cedar Falls businesses in person?", answer: "We serve Cedar Falls and the broader Cedar Valley with the same team that handles our Iowa case studies, including the landscaping company that saw +340% organic traffic growth." },
      { question: "How much does marketing cost in Cedar Falls?", answer: "SEO typically starts at $2,000 per month for Iowa markets. Google Ads management runs $2,000 to $4,000 plus ad spend. Costs are lower than national averages because competition is moderate." },
      { question: "What results have you seen in Iowa?", answer: "Our landscaping client went from 320 to 4,380 monthly organic visits in 8 months. Dental and home services clients across Iowa see similar patterns when local SEO and GBP work are done together." },
    ],
  },
  "cedar-rapids": {
    answerBlock:
      "KINEXIS helps Cedar Rapids and Linn County businesses grow through SEO, Google Ads, and conversion-focused web design. Manufacturing, healthcare, and home services drive most search demand in Eastern Iowa. We use Iowa-specific proof points, not templated city swaps.",
    marketInsight:
      "Cedar Rapids has a strong manufacturing and logistics base alongside growing healthcare and trades sectors. Businesses here often underestimate how much search volume comes from Marion, Hiawatha, and suburban Linn County.",
    industries: ["Manufacturing", "Home services", "Healthcare", "Professional services"],
    localFaqs: [
      { question: "Do you have Cedar Rapids case studies?", answer: "Yes. Our landscaping company case study covers Cedar Rapids area contractors with verified traffic and lead metrics, not generic claims." },
      { question: "How long does SEO take in Cedar Rapids?", answer: "Local SEO for trades and healthcare often shows map pack improvement in 60 to 90 days. Broader organic growth typically needs 4 to 6 months." },
      { question: "Do you run Google Ads for Cedar Rapids contractors?", answer: "Yes. We manage local service and search campaigns with call tracking tied to booked jobs, not just form fills." },
    ],
  },
  "des-moines": {
    answerBlock:
      "KINEXIS supports Des Moines and Central Iowa businesses scaling beyond referrals. SaaS, professional services, and regional brands compete for statewide search visibility. SEO retainers for Des Moines typically start at $2,500 per month with paid media and analytics for multi-location brands available at higher tiers.",
    marketInsight:
      "Des Moines functions as Iowa's economic hub. B2B firms here search for agencies that understand longer sales cycles and can tie marketing to CRM pipeline, not just website traffic.",
    industries: ["SaaS and B2B", "Professional services", "Healthcare", "Financial services"],
    localFaqs: [
      { question: "How much does SEO cost in Des Moines?", answer: "Most Des Moines SEO programs run $2,500 to $6,000 per month. B2B and professional services keywords cost more than local trades." },
      { question: "Do you work with Des Moines SaaS companies?", answer: "Yes. We run content, paid search, and analytics for Central Iowa B2B brands with multi-month sales cycles." },
      { question: "Can you support multi-location Iowa brands?", answer: "Yes. We build location strategies for brands serving Des Moines, Cedar Rapids, and Davenport without duplicate thin pages." },
    ],
  },
  waterloo: {
    answerBlock:
      "KINEXIS provides digital marketing for Waterloo businesses in trades, healthcare, and manufacturing across the Cedar Valley. We combine cross-metro campaigns spanning Waterloo and Cedar Falls with conversion-focused sites built for mobile-first Iowa buyers.",
    marketInsight:
      "Waterloo shares search behavior with Cedar Falls but has distinct neighborhoods and employer bases. Healthcare and manufacturing searches dominate, with strong seasonal swings in home services.",
    industries: ["Manufacturing", "Healthcare", "Home services", "Trades"],
    localFaqs: [
      { question: "Do you cover both Waterloo and Cedar Falls?", answer: "Yes. We run cross-metro campaigns when it makes sense and build separate location content when each city needs its own landing experience." },
      { question: "What marketing works best for Waterloo trades?", answer: "Google Local Services Ads plus map pack SEO plus a fast mobile site with click-to-call. Most trades clients use that combination." },
      { question: "How quickly can we get leads in Waterloo?", answer: "Google Ads can produce calls within days of launch. SEO and map pack work typically need 60 to 90 days before free clicks compound." },
    ],
  },
};

export function getLocationDetail(slug: string): LocationDetailContent | undefined {
  return locationDetails[slug];
}
