const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();

// Target URL to which the proxy will forward requests
const targetUrl = process.env.TARGET_URL;

// Proxy all incoming requests to the target URL
app.use(
  "/",
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/", // Rewrite the path (if needed)
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Proxying request to: ${targetUrl}${req.url} (Method: ${
          req.method
        }, Headers: ${JSON.stringify(req.headers)})`
      );
    },
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
