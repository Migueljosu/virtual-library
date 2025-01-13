//cors.js
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin:", origin);  // Adicionando log para depuração

    if (!origin) return callback(null, true);

    const allowedOrigins = [
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/192\.168\.\d+\.\d+:\d+$/, // IPs locais
      /^http:\/\/\d+\.\d+\.\d+\.\d+:\d+$/, // Outros IPs na rede local
    ];

    if (allowedOrigins.some((pattern) => pattern.test(origin))) {
      return callback(null, true);
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
};

module.exports = corsOptions;
