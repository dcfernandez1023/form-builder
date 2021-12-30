import { app } from "./app";


export const startServer = (port: number) => {
  app.listen(port);
  console.log("## Server started successfully ##");
}
