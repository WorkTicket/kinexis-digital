export type LegalSection = { title: string; paragraphs: string[]; list?: string[] };
export type LegalPageContent = { title: string; lastUpdated: string; intro: string; sections: LegalSection[]; contactLabel: string };
