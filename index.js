import "dotenv/config.js";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(express.json());

// Redirigir tráfico al servicio de Usuarios
app.use("/users", createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  logLevel: "debug"
}));

app.use("/products", createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
  logLevel: "debug"
}));


// Servidor del API Gateway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));

