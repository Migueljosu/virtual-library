// middlewares/cors.js
const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = [
      /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/(localhost|\d+\.\d+\.\d+\.\d+):\d+$/,
    ];

    if (allowedOrigins.some((pattern) => pattern.test(origin))) {
      return callback(null, true);
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
};

module.exports = corsOptions;
