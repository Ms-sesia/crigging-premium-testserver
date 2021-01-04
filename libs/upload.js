import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${path.join(__dirname, "../../", "Uploads")}`);
  },
  filename: (req, file, cb) => {
    cb(null, new Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("file");

export const uploadPost = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json(err);
    next();
  });
};

export const uploadPostController = (req, res) => {
  const { files } = req;
  const location = [];
  //resize 필요하면 추가.
  files.map((file) => location.push(process.env.LOCALSTORAGEADDR + file.filename));

  return res.status(200).json(location);
};
