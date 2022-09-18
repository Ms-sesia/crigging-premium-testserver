import multer from "multer";
import setStorage from "./setStorage";
import sharp from "sharp";
import path from "path";
import fs from "fs";

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

export const uploadController = async (req, res) => {
  const { files } = req;
  const location = [];
  //resize 적용
  for (let i = 0; i < files.length; i++) {
    await sharp(files[i].path)
      .rotate()
      .resize(1024)
      .jpeg({ quality: 90 })
      .toFile(path.resolve(files[i].destination, "resize_" + files[i].filename));
    fs.unlinkSync(files[i].path);
  }
  files.map((file) => location.push(process.env.LOCALSTORAGEADDR + "resize_" + file.filename));

  return res.status(200).json(location);
};
