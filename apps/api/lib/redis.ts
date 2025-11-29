import Redis from "ioredis";

const redis = new Redis({
  host: "redis",
  port: 6379,
  db: 0, // default database
  // password: process.env.REDIS_PASSWORD,
});

export { redis };
