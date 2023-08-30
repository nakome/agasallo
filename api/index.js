import { Deta } from "deta";
import Express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path"; // Importa el módulo path
import ejs from "ejs";
import compression from 'compression'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --
import { marked } from "marked";
import * as sass from "sass";
import typescript from "typescript";

const deta = Deta();
const db = deta.Base("bins");
const app = Express();

app.use(Express.json());
app.use(compression())
app.use(cors())

// Configurar el motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Utiliza path.join()

// --------------- Converters ---------------
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
// ----------------------------------------

/**
 * Get list of Bins
 */
app.get("/", async (req, res) => {
  try {
    const bins = await db.fetch();
    bins.items.sort((a, b) => a.update_at - b.update_at);
    res.send({ success: true, data: bins });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

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
    bins.items.sort((a, b) => a.update_at - b.update_at);
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

      res.render("index", { data: bin });
    } else {
      res.render("error", {});
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

      res.render("index", { data: bin });
    } else {
      res.render("error", {});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Add new Bin
 */
app.post("/", async (req, res) => {
  try {
    let arr = {
      title: req.body.title,
      html_type: req.body.html_type,
      html_code: req.body.html_code,
      css_type: req.body.css_type,
      css_code: req.body.css_code,
      css_links: req.body.css_links,
      js_type: req.body.js_type,
      js_code: req.body.js_code,
      js_links: req.body.js_links,
      public: req.body.public,
      create_at: today(),
      update_at: today(),
    };
    const bin = await db.put(arr);
    res.send({ success: true, data: bin });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Update bin
 */
app.put("/:key", async (req, res) => {
  try {
    const bin = await db.get(req.params.key);
    bin.title = req.body.title;
    bin.html_type = req.body.html_type;
    bin.html_code = req.body.html_code;
    bin.css_type = req.body.css_type;
    bin.css_code = req.body.css_code;
    bin.css_links = req.body.css_links;
    bin.js_type = req.body.js_type;
    bin.js_code = req.body.js_code;
    bin.js_links = req.body.js_links;
    bin.public = req.body.public;
    bin.update_at = today();
    await db.update({ ...bin, key: undefined }, req.params.key);
    res.send({ success: true, data: bin });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Delete existing todo
 */
app.delete("/:key", async (req, res) => {
  try {
    await db.delete(req.params.key);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});

/**
 * Show Error on document
 *
 * @param {string} str
 * @returns
 */
function parseError(str) {
  return `<pre style="background: #0e0e0e;color:white;white-space: pre-wrap;padding:10px;border-radius: 5px;border: 2px solid black;">${str}</pre>`;
}

/**
 * Convert Typescript to javascript
 *
 * @param {string} str
 * @returns
 */
function toTypeScript(str) {
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
function toCss(str) {
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
function toMd(str) {
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
function ejsToHtml(templateString, data) {
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
function today() {
	const dateOb = new Date()
	const date = ('0' + dateOb.getDate()).slice(-2)
	const month = ('0' + (dateOb.getMonth() + 1)).slice(-2)
	const year = dateOb.getFullYear()
	const hours = dateOb.getHours()
	const minutes = dateOb.getMinutes()
	const seconds = dateOb.getSeconds()
	const time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds

  return time;
}

/**
 * Capitalize
 *
 * @param {sting} str
 * @returns
 */
function capitalize(str) {
  return str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
