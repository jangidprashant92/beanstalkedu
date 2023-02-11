import { Router } from "express";
import { MulterError } from "multer";
import FileUploadController from "../controllers/api/FileUploadController";
import Validate from "../middlewares/Validate";
import { error } from "../utils/ResponseApi";
import storage from "../utils/storage";

import { fileUploadValidation } from "../validations/file-upload.validation";

export class FileUploadRoutes {
  public router: Router;
  public FileUploadController: FileUploadController =
    new FileUploadController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post(
      "/upload-file",
      storage.single("file"),
      this.FileUploadController.upload,
      (err: MulterError, req: any, res: any, next: any) => {
        //File upload encountered an error as returned by multer
        res.status(400).json(error(err.message));
      }
    );

    this.router.get("/download-file", this.FileUploadController.download);
  }
}
