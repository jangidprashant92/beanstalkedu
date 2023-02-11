import express, { Express } from "express";
import cors from "cors";
import { createServer, Server } from "http";
import { routes } from "./routes";
import path from "path";

class App {
  app: Express;
  port: string | undefined;
  server: Server | undefined;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3005";
  }

  private cors() {
    const options: cors.CorsOptions = {
      origin: "*",
    };
    this.app.use(cors(options));
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/uploads", express.static(path.resolve("uploads")));
  }

  private routes() {
    this.app.use(routes);
  }

  loadServer = () => {
    this.server = createServer(this.app);
    this.cors();
    this.middlewares();
    this.routes();

    this.server.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  };
}
export default new App();
