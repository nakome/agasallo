import Express from "express";
import { Deta } from "deta";
import { today } from "../utils.js";

const deta = Deta();
const db = deta.Base("bins");
const app = Express();

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

export default app;