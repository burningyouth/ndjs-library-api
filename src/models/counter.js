const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient({ url: REDIS_URL });

(async () => {
  await client.connect();
})();

const increment = (key) => client.incr(String(key));

const getCount = (key) => client.get(String(key));

module.exports = {
  increment,
  getCount,
};
