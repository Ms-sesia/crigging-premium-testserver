import multer from "multer";
import path from "path";

export default (subject) => {
  let diskPath;
  subject === "post"
    ? (diskPath = path.join(__dirname, "../../../", "data/Uploads/postUploads"))
    : (diskPath = path.join(__dirname, "../../../", "data/Uploads/avatarUploads"));
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, diskPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  return storage;
};
