import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import schema from "./schema";
import { uploadPost, uploadPostController } from "../libs/upload";
import morgan from "morgan";

const PORT = process.env.SERVER_PORT || 4002;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

// server.express.use(morgan("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadPost, uploadPostController);

server.start({ port: PORT }, () => console.log(`Server is running on localhost:${PORT}`));
