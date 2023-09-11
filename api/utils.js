// --
import { marked } from "marked";
import * as sass from "sass";
import typescript from "typescript";
import ejs from "ejs";

/**
 * Show Error on document
 *
 * @param {string} str
 * @returns
 */
export function parseError(str) {
  return `<pre style="background: #0e0e0e;color:white;white-space: pre-wrap;padding:10px;border-radius: 5px;border: 2px solid black;">${str}</pre>`;
}

/**
 * Convert Typescript to javascript
 *
 * @param {string} str
 * @returns
 */
export function toTypeScript(str) {
  try {
    let source = typescript.transpileModule(str, {}).outputText;
    return { status: true, data: source };
  } catch (error) {
    return { status: false, error: error };
  }
}

/**
 * Convert Scss to css
 *
 * @param {string} str
 * @returns
 */
export function toCss(str) {
  try {
    let scss = sass.compileString(str);
    return { status: true, data: scss.css }
  } catch (error) {
    return { status: false, error: error };
  }
}

/**
 * Convert Markdown to html
 *
 * @param {string} str
 * @returns
 */
export function toMd(str) {
  try {
    let md = marked.parse(str);
    return { status: true, data: md };
  } catch (error) {
    return { status: false, error: error };
  }
}

/**
 * Ejs to Html
 * @param {string} templateString
 * @param {string} data
 * @returns
 */
export function ejsToHtml(templateString, data) {
  try {
    const compiledTemplate = ejs.compile(templateString);
    const renderedOutput = compiledTemplate(data);
    return { status: true, data: renderedOutput };
  } catch (error) {
    return { status: false, error: error };
  }
}

/**
 * Today
 * @returns {string}
 */
export function today() {
  const dateOb = new Date();
  const date = ("0" + dateOb.getDate()).slice(-2);
  const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
  const year = dateOb.getFullYear();
  const hours = dateOb.getHours();
  const minutes = dateOb.getMinutes();
  const seconds = dateOb.getSeconds();
  const time =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return time;
}

/**
 * Capitalize
 *
 * @param {sting} str
 * @returns
 */
export function capitalize(str) {
  return str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Check type and render
 * @param {object} bin
 * @returns
 */
export function checkTypeAndRender(bin) {
  if (bin.html_type === "markdown") {
    const output = toMd(bin.html_code);
    if (output.status) {
      bin.html_code = output.data;
    } else {
      bin.html_code += parseError(output.error);
    }
  }

  if (bin.css_type === "sass") {
    const output = toCss(bin.css_code);
    if (output.status) {
      bin.css_code = output.data;
    } else {
      bin.html_code += parseError(output.error);
    }
  }

  if (bin.js_type === "typescript") {
    const output = toTypeScript(bin.js_code);
    if (output.status) {
      bin.js_code = output.data;
    } else {
      bin.html_code += parseError(output.error);
    }
  }
  return bin;
}

/**
 * Parse Cdoe
 * @param {obj} bin
 * @param {string} type
 * @returns
 */
export function parseCode(bin, type) {
  let contentType, content;

  switch (type) {
    case "css":
    case "sass":
      contentType = "text/css";
      content = bin.css_code;
      break;
    case "js":
    case "typescript":
    case "javascript":
      contentType = "application/javascript";
      content = bin.js_code;
      break;
    case "html":
    case "markdown":
    case "md":
      contentType =
        type === "md" || type === "markdown" ? "text/plain" : "text/html";
      content = bin.html_code;
      break;
    default:
      content = null;
      break;
  }

  return [content, contentType];
}

/**
 * Process Code
 * @param {string} code
 * @param {string} codeType
 * @param {function} transformer
 * @returns
 */
export function processCode(code, codeType, transformer) {
  return code;
}

/**
 * Compare 2 objects
 * @param {string} a
 * @param {string} b
 * @returns
 */
export function compare(a, b) {
  if (a.update_at < b.update_at) {
    return 1;
  }
  if (a.update_at > b.update_at) {
    return -1;
  }
  return 0;
}
