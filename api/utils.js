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
    return { status: true, data: scss.css };
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
