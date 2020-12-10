import { GraphQLServer } from "graphql-yoga";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import schema from "./schema";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(authenticateJwt);

server.start(() => console.log("Server is running on localhost:4000"));
