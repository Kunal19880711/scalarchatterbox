import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import path from "path";
import express from "express";
import helmet from "helmet";
import http from "http";

import setupIO from "./setupIO.js";

const port = 8000;
const __dirname = import.meta.dirname;
const app = express();
const server = http.createServer(app);
setupIO(server);

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["'self'", "*.stripe.com"],
      scriptSrc: ["'self'", "*.stripe.com"], // Allow scripts from 'self'
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
      imgSrc: ["'self'", "data:", "*"], // Allow images from 'self' and data URLs,
      connectSrc: ["'self'", "*.stripe.com"], // Allow connections to 'self'
      fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
      objectSrc: ["'none'"], // Disallow object, embed, and applet elements
      upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
    },
  })
);

app.use(
  "/",
  express.static(path.join(__dirname, "..", "..", "client", "dist"))
);

server.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});
