import Express from "express";
import { Deta } from "deta";

import {
  checkTypeAndRender,
  parseCode,
  capitalize,
  loadBin
} from "../utils.js";

const deta = Deta();
const db = deta.Base("bins");
const app = Express();

/**
 * Get only one
 */
app.get("/settings", async (req, res) => {
  try {
    res.render("settings", {
      baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Get only one
 */
app.get("/uid/:key", async (req, res) => {
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
    res.send({ success: true, data: await loadBin(bins) });
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
      res.render("index", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
        debug:false,
        data: checkTypeAndRender(bin),
      });
    } else {
      res.render("error", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});
/**
 *
 * Share code
 */
app.get("/share/:key/:type", async (req, res) => {
  try {
    const { key, type } = req.params;
    const bin = await db.get(key);
    if (bin && bin.public) {
      const [content, contentType] = parseCode(bin, type);
      if (content) {
        res.setHeader("Content-Type", contentType);
        res.send(content);
      } else {
        res.status(404).send("Invalid file type.");
      }
    } else {
      res.render("error", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
      });
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
      res.render("index", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
        debug: true,
        data: checkTypeAndRender(bin),
      });
    } else {
      res.render("error", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

/**
 * Get only one
 */
app.get("/raw/:key", async (req, res) => {
  try {
    const bin = await db.get(req.params.key);
    if (bin && bin.public) {
      res.status(200).send({ success: true, data:bin });
    }else {
      res.render("error", {
        baseUrl: `//${process.env.DETA_SPACE_APP_HOSTNAME}`,
      });
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
    res.send({ success: true, data: await loadBin(bins) });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

export default app;