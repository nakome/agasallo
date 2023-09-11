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

/**
 * Add new Bin
 */
app.post("/import/data", async (req, res) => {

  const data = req.body;

  // Is array ?
  if (!Array.isArray(data)) {
    return res.status(400).json({ status: 400, msg: 'Sorry, this is not Json file.' });
  }

  // Values you want to check in the array
  const expectedValues = ["create_at","css_code","css_links","css_type","html_code","html_type","js_code","js_links","js_type","key","public","title","update_at"];

  // Check if all objects in the array contain the expected values
  const areValuesPresentInAllObjects = data.every(obj =>
    expectedValues.every(key => obj.hasOwnProperty(key))
  );

  // If error show msg
  if (!areValuesPresentInAllObjects) {
    return res.status(400).json({ status: 400, msg: 'Some objects in the array do not contain expected values.' });
  }

  // Insert 25-by-25 objects
  const groupOfElements = [];
  for (let i = 0; i < data.length; i += 5) {
    groupOfElements.push(data.slice(i, i + 5));
  }

  // Insert many
  for (const group of groupOfElements) {
    try {
      await db.putMany([...group]);
      return res.status(200).json({ status: 200, msg: 'Success on import data.',data: group});
    } catch (error) {
      console.error('Error al insertar elementos:', error);
      return res.status(500).json({ status: 500, msg: 'Error al insertar elementos.' });
    }
  }
});

export default app;