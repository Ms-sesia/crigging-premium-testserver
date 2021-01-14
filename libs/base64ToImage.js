import fs from "fs";

export default (base64Str, path, { fileName, type }) => {
  const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) throw new Error("Invalid base64 string");

  const imageBuffer = Buffer.from(matches[2], "base64");
  const abs = path + fileName + "." + type;

  fs.writeFile(abs, imageBuffer, "base64", function (err) {
    if (err) console.log("File image write error", err);
  });
};
