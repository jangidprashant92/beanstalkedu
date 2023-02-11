import express from "express";
import { FileUploadRoutes } from "./file-upload";

const router = express.Router();

router.use("/api", new FileUploadRoutes().router);

export { router as routes };
