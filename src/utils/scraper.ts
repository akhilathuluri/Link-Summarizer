import * as cheerio from 'cheerio';

export async function scrapeContent(url: string): Promise<string> {
  try {
    // Use a CORS proxy to handle cross-origin requests
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, footer, header, aside, iframe, .ad, .advertisement, .social-share').remove();

    // Extract main content
    const article = $('article').first();
    const main = $('main').first();
    const content = article.length ? article : main.length ? main : $('body');

    // Get text content with better structure
    const textParts: string[] = [];

    // Extract headings
    content.find('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const text = $(el).text().trim();
      if (text) textParts.push(text);
    });

    // Extract paragraphs
    content.find('p').each((_, el) => {
      const text = $(el).text().trim();
      if (text) textParts.push(text);
    });

    // Extract lists
    content.find('ul, ol').each((_, el) => {
      const items = $(el).find('li').map((_, li) => `• ${$(li).text().trim()}`).get();
      if (items.length) textParts.push(items.join('\n'));
    });

    const text = textParts.filter(Boolean).join('\n\n');

    if (!text) {
      throw new Error('No content could be extracted from the page');
    }

    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to scrape content: ${message}`);
  }
}