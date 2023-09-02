export const MarkdownToHtml = async (content) => {
  try {
    const response = await fetchData("/api/convert/to/md", {
      html_code: content,
    });
    const output = await response;
    return output.status ? output.data : "Error: " + JSON.stringify(output);
  } catch (error) {
    return error;
  }
};
export const ScssToCss = async (content) => {
  try {
    const response = await fetchData("/api/convert/to/scss", {
      css_code: content,
    });
    const output = await response;
    return output.status ? output.data : "Error: " + JSON.stringify(output);
  } catch (error) {
    return error;
  }
};
export const TypeScriptToJs = async (content) => {
  try {
    const response = await fetchData("/api/convert/to/ts", {
      js_code: content,
    });
    const output = await response;
    return output.status ? output.data : "Error: " + JSON.stringify(output);
  } catch (error) {
    return error;
  }
};

async function fetchData(url, data) {
  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const output = await response.json();
  return output;
}
