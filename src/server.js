import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import schema from "./schema";
import { uploadPost, uploadPostController } from "./libs/upload";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadPost, uploadPostController);

server.start(() => console.log("Server is running on localhost:4000"));
