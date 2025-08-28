import axios from 'axios';

/**
 * Gets the HTML content from the Segura reservoirs page.
 * @param url - The URL to fetch the HTML content from
 * @returns Promise that resolves with the page HTML
 */
export async function getCuencaPageHTMLContent(url: string): Promise<string> {
  const { data: html } = await axios.get(url);
  return html;
}
