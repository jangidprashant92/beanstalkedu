import { Request, Response } from "express";
import { readFileSync } from "fs";
import { error, success } from "../../utils/ResponseApi";

class FileUploadController {
  public async upload(req: Request, res: Response): Promise<Response> {
    try {
      if (req.file) {
        return res.json(success({ ...req.file }));
      }
      return res.status(404).json(error("File not valid"));
    } catch (err) {
      const typedError = err as Error;
      return res.status(404).json(error(typedError.message));
    }
  }

  public async download(req: Request, res: Response): Promise<Response> {
    try {
      if (req.query.file) {
        const uploadPath: any = req.query.file;
        const data = readFileSync(uploadPath, { encoding: "utf8", flag: "r" })
          .toString()
          .split("\n");
        const logArray = data.map((item) => {
          const [timestamp, loglevel, txnObj] = item.split(" - ");
          const { transactionId, err } = txnObj
            ? JSON.parse(txnObj)
            : { transactionId: "", err: undefined };
          return {
            timestamp,
            loglevel,
            transactionId,
            err,
          };
        });
        res.setHeader("Content-Type", "text/json");
        const fileName = uploadPath.split("/");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${fileName[1]}.json`
        );
        return res.status(200).end(JSON.stringify(logArray, null, 2));
      }
      return res.status(404).json(error("File path not found"));
    } catch (err) {
      const typedError = err as Error;
      return res.status(404).json(error(typedError.message));
    }
  }
}

export default FileUploadController;
