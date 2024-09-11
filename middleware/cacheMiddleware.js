const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 });

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedData = cache.get(key);

  if (cachedData) {
    return res.json(cachedData);
  } else {
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cacheMiddleware;
