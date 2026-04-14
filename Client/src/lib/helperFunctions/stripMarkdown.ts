/**
 * Strips markdown syntax from a string, returning plain readable text.
 * Useful for rendering blog excerpts/descriptions in cards where
 * markdown formatting should not be visible.
 */
export function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/#{1,6}\s?/g, '')                    // ## headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')             // **bold**
    .replace(/\*([^*]+)\*/g, '$1')                 // *italic*
    .replace(/`{3}[\s\S]*?`{3}/g, '')             // ```code blocks```
    .replace(/`([^`]+)`/g, '$1')                   // `inline code`
    .replace(/^[-*+]\s/gm, '')                     // - list items
    .replace(/^\d+\.\s/gm, '')                     // 1. numbered lists
    .replace(/^>\s?/gm, '')                        // > blockquotes
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')       // [link](url) -> link
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')      // ![alt](image) -> alt
    .replace(/---+/g, '')                          // --- horizontal rules
    .replace(/--/g, ' ')                           // -- dashes
    .replace(/\n{2,}/g, '. ')                      // multiple newlines -> period
    .replace(/\n/g, ' ')                           // single newlines -> space
    .replace(/\s{2,}/g, ' ')                       // multiple spaces -> single
    .trim();
}
