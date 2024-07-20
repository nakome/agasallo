import fetchData from "../utils/fetchData.js";

export const MarkdownToHtml = async (content) => await formatCode("/api/convert/to/md", {html_code: content});
export const ScssToCss = async (content) => await formatCode("/api/convert/to/scss", {css_code: content});
export const TypeScriptToJs = async (content) => await formatCode("/api/convert/to/ts", {js_code: content});
export const BabelToJs = async (content) => await formatCode("/api/convert/to/babel", {js_code: content});

async function formatCode(url, data) {
  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    return response.status ? response.data : "Error: " + JSON.stringify(response);
  } catch (error) {
    return error;
  }
}
