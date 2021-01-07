import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import schema from "./schema";
import { uploadPost, uploadPostController } from "../libs/upload";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.SERVER_PORT;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(morgan("dev"));
server.express.use(cors());
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadPost, uploadPostController);

server.start({ port: PORT }, () => console.log(`Server is running on localhost:${PORT}`));
