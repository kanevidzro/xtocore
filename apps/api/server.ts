import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const server = new Hono();

// Request logger
server.use("*", logger());

// Global CORS
server.use("*", cors());

server.get("/", (c) => {
  return c.json({ message: "Hello from the API server!" });
});

server.notFound((c) => c.json({ error: "Route not found" }, 404));

server.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

// Bun server
Bun.serve({
  port: 1502,
  fetch: server.fetch,
});

console.log("API server is running on http://localhost:1502"); // Example route
