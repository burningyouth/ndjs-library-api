const express = require("express");

const router = express.Router();

router.post("/counter/:bookId/incr", (_, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

module.exports = router;
