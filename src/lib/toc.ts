type RenderedHeading = {
  depth: number;
  slug: string;
  text: string;
};

const SUBSCRIPT_DIGITS: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
};

const LATEX_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\\partial\s*/g, "∂"],
  [/\\alpha\b/g, "α"],
  [/\\beta\b/g, "β"],
  [/\\gamma\b/g, "γ"],
  [/\\delta\b/g, "δ"],
  [/\\theta\b/g, "θ"],
  [/\\lambda\b/g, "λ"],
  [/\\eta\b/g, "η"],
  [/\\phi\b/g, "φ"],
  [/\\nabla\b/g, "∇"],
  [/\\cdot\b/g, "·"],
  [/\\times\b/g, "×"],
  [/\\rightarrow\b/g, "→"],
  [/\\left\b|\\right\b/g, ""],
  [/\\quad\b|\\qquad\b/g, " "],
];

function normalizeLatex(value: string): string {
  let text = value;

  text = text.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, numerator, denominator) => {
    return `${normalizeLatex(numerator)}/${normalizeLatex(denominator)}`;
  });

  text = text.replace(/\\text\{([^{}]*)\}/g, "$1");

  for (const [pattern, replacement] of LATEX_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }

  return text
    .replace(/_\{?([0-9])\}?/g, (_, digit: string) => SUBSCRIPT_DIGITS[digit] ?? digit)
    .replace(/\^\{?T\}?/g, "ᵀ")
    .replace(/\\[a-zA-Z]+\b/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMarkdownHeadingText(value: string): string {
  return value
    .replace(/\$([^$]+)\$/g, (_, expression: string) => normalizeLatex(expression))
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getMarkdownTocTexts(markdown: string) {
  const headings: Array<{ depth: number; text: string }> = [];
  let fenceMarker: string | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    const fenceMatch = trimmed.match(/^(```+|~~~+)/);

    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      fenceMarker = fenceMarker === marker ? null : marker;
      continue;
    }

    if (fenceMarker) continue;

    const headingMatch = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!headingMatch) continue;

    headings.push({
      depth: headingMatch[1].length,
      text: cleanMarkdownHeadingText(headingMatch[2]),
    });
  }

  return headings;
}

export function getTocHeadings(
  renderedHeadings: RenderedHeading[],
  markdown: string,
): RenderedHeading[] {
  const markdownHeadings = getMarkdownTocTexts(markdown);
  let markdownIndex = 0;

  return renderedHeadings
    .filter((heading) => heading.depth >= 2 && heading.depth <= 3)
    .map((heading) => {
      const markdownHeading = markdownHeadings[markdownIndex];
      markdownIndex += 1;

      return {
        ...heading,
        text: markdownHeading?.text || cleanMarkdownHeadingText(heading.text),
      };
    });
}
