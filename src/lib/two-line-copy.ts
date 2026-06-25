/** Split copy on `|` into two intentional display lines (no ellipsis truncation). */
export function parseTwoLine(text: string): { line1: string; line2: string | null } {
  const pipeIndex = text.indexOf("|");
  if (pipeIndex === -1) {
    return { line1: text, line2: null };
  }
  return {
    line1: text.slice(0, pipeIndex).trim(),
    line2: text.slice(pipeIndex + 1).trim() || null,
  };
}

export function hasTwoLineSplit(text: string): boolean {
  return text.includes("|");
}
