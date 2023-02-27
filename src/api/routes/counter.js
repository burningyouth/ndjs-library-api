const express = require("express");
const counter = require("../../models/counter");
const router = express.Router();

router.get("/counter/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const count = await counter.getCount(key);
    res.json({ count });
  } catch (e) {
    res.statusCode(500);
  }
});

router.post("/counter/:key/incr", async (req, res) => {
  const { key } = req.params;
  try {
    const count = await counter.increment(key);
    res.json({ count });
  } catch (e) {
    res.statusCode(500);
  }
});

module.exports = router;
