import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { AppDataSource } from "./repository/data-source";
import {routes}  from "./Routes/index"

let server: Server;

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "127.0.0.1",
  });

  server.route(routes);

  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  await AppDataSource.initialize();
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});

init().then(() => start());
