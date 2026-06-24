import type { ComparisonColumn, ComparisonRow } from "@/content/service-seo/types";

export type ComparisonProps = {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
};

export function getColumnIndices(columns: ComparisonColumn[]) {
  const highlightIndex = columns.findIndex((col) => col.highlight);
  const safeHighlight = highlightIndex >= 0 ? highlightIndex : 1;
  const altIndex = safeHighlight === 0 ? 1 : 0;
  return { highlightIndex: safeHighlight, altIndex };
}

export function findRow(rows: ComparisonRow[], ...keywords: string[]) {
  return rows.find((row) => {
    const label = row.label.toLowerCase();
    return keywords.some((keyword) => label.includes(keyword));
  });
}

export function bodyRows(rows: ComparisonRow[]) {
  const footerKeys = ["best for", "starting investment", "monthly investment", "project cost", "typical"];
  return rows.filter((row) => !footerKeys.some((key) => row.label.toLowerCase().includes(key)));
}

export function footerRows(rows: ComparisonRow[]) {
  const footerKeys = ["best for", "starting investment", "monthly investment", "project cost", "typical"];
  return rows.filter((row) => footerKeys.some((key) => row.label.toLowerCase().includes(key)));
}
