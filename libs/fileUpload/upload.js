import multer from "multer";
import "../../src/env";
import setStorage from "./setStorage";

export const uploadSet = (subject) => {
  return (res, req, next) => {
    const storage = setStorage(subject);
    if (storage) req.storage = storage;
    next();
  };
};

export const upload = (req, res, next) => {
  const storage = req.res.storage;
  const upload = multer({ storage: storage }).array("file");
  upload(req, res, (err) => {
    if (err) return res.status(500).json(err);
    next();
  });
};

export const uploadController = (req, res) => {
  const { files } = req;
  const location = [];
  //resize 필요하면 추가.
  files.map((file) => location.push(process.env.LOCALSTORAGEADDR + file.filename));

  return res.status(200).json(location);
};
