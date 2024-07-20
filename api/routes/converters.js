import Express from "express";

import {
  toTypeScript,
  toCss,
  toMd,
  toBabel,
  ejsToHtml,
} from "../utils.js";

const app = Express();

/**
 * Convert ejs to html
 */
app.post("/ejs", async (req, res) => {
  try {
    let source = ejsToHtml(req.body.template, req.body.data);
    res.send(source);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error });
  }
});

/**
 * Convert typescript to javascript
 */
app.post("/ts", async (req, res) => {
  try {
    let source = toTypeScript(req.body.js_code);
    res.send(source);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error });
  }
});

/**
 * Convert css to scss
 */
app.post("/scss", async (req, res) => {
  try {
    let source = toCss(req.body.css_code);
    res.send(source);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error });
  }
});

/**
 * Convert Markdown to html
 */
app.post("/md", async (req, res) => {
  try {
    let source = toMd(req.body.html_code);
    res.send(source);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error });
  }
});

/**
 * Compile with babel
 */
app.post("/babel", async (req, res) => {
  try {
    let source = toBabel(req.body.js_code);
    res.send(source);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error });
  }
});

const Converters = app;
export default Converters;