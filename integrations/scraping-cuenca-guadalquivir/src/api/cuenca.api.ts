import axios from "axios";

export async function getCuencaPageHTMLContent(url: string): Promise<string> {
  const { data: html } = await axios.get(url);
  return html;
}
