import { createClient } from "redis";
const dotenv = require("dotenv");
dotenv.config();

const client = createClient({
  password: process.env.REDIS_KEY,
  socket: {
    host: process.env.REDIS_URL,
    port: 19303,
  },
});
client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();
