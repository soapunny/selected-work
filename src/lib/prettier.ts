// src/lib/prettier.ts

import type { BundledLanguage, BundledTheme, Highlighter } from "shiki";

/**
 * Server-side syntax highlighting (Shiki).
 *
 * - Caches the highlighter in globalThis to avoid re-initializing on every render.
 * - Returns HTML that contains `<pre class="shiki">...</pre>` markup.
 * - CSS should override Shiki's inline background so our design system controls the surface.
 */

declare global {
  // eslint-disable-next-line no-var
  var __PQ_SHIKI__:
    | {
        highlighter: Highlighter | null;
        init: Promise<Highlighter> | null;
      }
    | undefined;
}

const DEFAULT_THEME: BundledTheme = "github-dark";
const DEFAULT_LANG: BundledLanguage = "ts";

function getCache() {
  if (!globalThis.__PQ_SHIKI__) {
    globalThis.__PQ_SHIKI__ = { highlighter: null, init: null };
  }
  return globalThis.__PQ_SHIKI__!;
}

async function getHighlighterCached(): Promise<Highlighter> {
  const cache = getCache();
  if (cache.highlighter) return cache.highlighter;

  if (!cache.init) {
    cache.init = (async () => {
      const { createHighlighter } = await import("shiki");

      const highlighter = await createHighlighter({
        themes: [DEFAULT_THEME],
        langs: [
          "ts",
          "tsx",
          "js",
          "jsx",
          "json",
          "bash",
          "shell",
          "css",
          "html",
          "md",
          "yaml",
          "java",
          "sql",
        ],
      });

      cache.highlighter = highlighter;
      return highlighter;
    })();
  }

  return cache.init;
}

export type HighlightOptions = {
  lang?: BundledLanguage;
  theme?: BundledTheme;
};

/**
 * Highlight code into HTML using Shiki.
 *
 * NOTE: This returns a full `<pre class="shiki">...</pre>` HTML string.
 * In React, render it with `dangerouslySetInnerHTML`.
 */
export async function highlightToHtml(
  code: string,
  opts: HighlightOptions = {},
): Promise<string> {
  const highlighter = await getHighlighterCached();
  const lang = (opts.lang ?? DEFAULT_LANG) as BundledLanguage;
  const theme = (opts.theme ?? DEFAULT_THEME) as BundledTheme;

  // Shiki expects a final newline for consistent line rendering.
  const normalized = code.endsWith("\n") ? code : `${code}\n`;

  return highlighter.codeToHtml(normalized, {
    lang,
    theme,
  });
}

/**
 * Convenience wrapper for TypeScript snippets.
 */
export async function highlightTs(code: string): Promise<string> {
  return highlightToHtml(code, { lang: "ts" });
}
