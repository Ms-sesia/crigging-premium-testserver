import { ApolloServer } from "apollo-server-express";
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./schema";
import { isAuthenticated } from "./middlewares";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import csp from "helmet-csp";
import morgan from "morgan";
import express from "express";
import { authenticateJwt } from "./passport";
import { uploadController, uploadSet, upload } from "./libs/fileUpload/upload";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.SERVER_PORT;

const server = new ApolloServer({
  schema,
  context: ({ req: request }) => ({ request, isAuthenticated }),
});

const app = express();

app.use(cors());
app.use(helmet());
// app.use(morgan("dev"));
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      styleSrcElem: ["'self'", "fonts.googleapis.com", "cdn.jsdelivr.net", "'unsafe-inline'"],
      imgSrc: ["'self'", "cdn.jsdelivr.net"],
      scriptSrcElem: ["'self'", "cdn.jsdelivr.net", "'unsafe-inline'"],
      fontSrc: ["'self'", "'unsafe-inline'", "fonts.gstatic.com"],
    },
  })
);
app.use(authenticateJwt);
app.use(express.static(path.join(__dirname, "../", "data/images", "craneList")));
app.use(express.static(path.join(__dirname, "../", "data/images", "craneCadImage")));
app.use(express.static(path.join(__dirname, "../", "data/excelDataJPG")));
app.use(express.static(path.join(__dirname, "../", "data/Uploads", "avatarUploads")));
app.use(express.static(path.join(__dirname, "../", "data/Uploads", "postUploads")));

app.get("/", expressPlayground({ endpoint: "/graphql" }));

server.applyMiddleware({ app });

app.set("views", "./src/views_file");
app.set("view engine", "pug");

app.get("/api/upload", (req, res) => {
  res.render("upload");
});

app.post("/api/postUpload", uploadSet("post"), upload, uploadController);
app.post("/api/avatarUpload", uploadSet("avatar"), upload, uploadController);

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});