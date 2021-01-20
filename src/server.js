import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import schema from "./schema";
import { uploadPost, uploadPostController } from "../libs/upload";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import path from "path";

const PORT = process.env.SERVER_PORT;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

// server.express.use((req, res, next) => {
//   console.log(req);
//   next();
// });

// server.express.use(morgan("dev"));
server.express.use(cors());
server.express.use(authenticateJwt);
server.express.use(express.static(path.join(__dirname, "../", "data/images", "craneList")));
server.express.use(express.static(path.join(__dirname, "../", "data/images", "craneCadImage")));
server.express.use(express.static(path.join(__dirname, "../", "data/excelDataJPG")));
server.express.use(express.static(path.join(__dirname, "../", "data/images", "Uploads")));
// server.express.set("views", "./src/views_file");
// server.express.set("view engine", "pug");

// server.express.get("/upload", (req, res) => {
//   res.render("upload");
// });
// server.express.post("/upload", uploadPost, uploadPostController);
server.express.post("/api/upload", uploadPost, uploadPostController);

server.start({ port: PORT }, () => console.log(`Server is running on localhost:${PORT}`));
