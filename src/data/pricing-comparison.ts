/** Side-by-side plan comparison used on the English pricing page. */
export const PRICING_COMPARISON: { group: string; rows: [string, string, string, string, string][] }[] = [
  {
    group: "The site",
    rows: [
      ["Pages included", "Up to 5", "Up to 10", "Up to 20", "Up to 10"],
      ["Hosting, SSL, backups", "Included", "Included", "Included", "12 months"],
      ["Small edits", "2 / month, 2 days", "Unlimited, 1 day", "Unlimited, same day", "30 min / month"],
      ["New pages", "$99 each", "1 / month included", "2 / month included", "Quoted"],
      ["Site-file ownership", "—", "—", "—", "Yes"],
    ],
  },
  {
    group: "Lead follow-up",
    rows: [
      ["Missed-call text-back**", "—", "Optional add-on", "Optional · EN + ES", "Add-on $97/mo"],
      ["Google review requests", "—", "After every job", "English + Spanish", "—"],
      ["Google Business Profile", "—", "Tune-up", "Tune-up + 2 posts / mo", "—"],
      ["Call tracking + report", "—", "Monthly", "Monthly", "—"],
      ["Bilingual site", "—", "—", "Yes", "—"],
    ],
  },
  {
    group: "The deal",
    rows: [
      ["60-day lead guarantee", "—", "Yes", "Yes", "—"],
      ["30-day money-back", "Yes", "Yes", "Yes", "Yes"],
      ["Billing", "Month-to-month", "Month-to-month", "Month-to-month", "One payment"],
      ["Cancel anytime", "Yes", "Yes", "Yes", "—"],
      ["Price locked", "24 months", "24 months", "24 months", "One payment"],
      ["Price", "$97 / mo", "$197 / mo", "$297 / mo", "$1,497 once"],
    ],
  },
];
