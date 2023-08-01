import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

import { Server } from "http";

// console.log(config.port)

process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢Database is connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect", error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  console.info("SIGTERM is recieved");
  if (server) {
    server.close();
  }
});
