import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const whitelist = ["application/octet-stream"];

const fileFilter = (req: any, file: any, cb: any) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error("file is not allowed"));
  }

  cb(null, true);
};

export default multer({ storage, fileFilter });
