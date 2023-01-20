module.exports = (_, res, next) => {
  res.status(404).json({ error: "Not found" });
  next();
};
