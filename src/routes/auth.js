const express = require("express");

const router = express.Router();

router.post("/auth/login", (_, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

module.exports = router;
