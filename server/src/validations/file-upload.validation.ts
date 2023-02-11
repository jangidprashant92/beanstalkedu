import { check } from "express-validator";

export const fileUploadValidation = [
  check("file", "File is requied").notEmpty()
];
