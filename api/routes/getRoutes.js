import Express from "express";
import { Deta } from "deta";

import { parseError, toTypeScript, toCss, toMd, capitalize } from "../utils.js";

const deta = Deta();
const db = deta.Base("bins");
const app = Express();

/**
 * Get only one
 */
app.get("/:key", async (req, res) => {
  try {
    const bins = await db.get(req.params.key);
    res.send({ success: true, data: bins });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Get only one
 */
app.get("/s/:name", async (req, res) => {
  try {
    const queries = [
      { "title?pfx": req.params.name.toLowerCase() },
      { "title?contains": req.params.name.toLowerCase() },
      { "title?pfx": capitalize(req.params.name) },
      { "title?contains": capitalize(req.params.name) },
      { "update_at?contains": req.params.name.toLowerCase() },
      { "create_at?contains": req.params.name.toLowerCase() },
    ];
    const bins = await db.fetch(queries);
    bins.items.sort(compare);
    res.send({ success: true, data: bins });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});
/**
 *
 * Share code
 */
app.get("/share/:key", async (req, res) => {
  try {
    const bin = await db.get(req.params.key);
    if (bin && bin.public) {
      res.render("index", { baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`, data: checkTypeAndRender(bin) });
    } else {
      res.render("error", {baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Get only one
 */
app.get("/preview/:key", async (req, res) => {
  try {
    const bin = await db.get(req.params.key);
    if (bin) {
      res.render("index", { baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`, data: checkTypeAndRender(bin) });
    } else {
      res.render("error", {baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/*
 * Get list of Bins
 */
app.get("/", async (req, res) => {
  try {
    const bins = await db.fetch();
    bins.items.sort(compare);
    res.send({ success: true, data: bins });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

function checkTypeAndRender(bin) {
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

function compare(a, b) {
  if (a.update_at < b.update_at) {
    return 1;
  }
  if (a.update_at > b.update_at) {
    return -1;
  }
  return 0;
}

export default app;
