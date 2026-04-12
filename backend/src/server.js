/*
  Centennial College
  COMP308 - Emerging Technologies (SEC.403)
  Assignment 3 — Group 3
  Backend entry point — Apollo Server + Express
  Wired by: Engracia Da Costa Pereira Batista (301394018)
*/

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const connectDB = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const context = require("./graphql/context");

dotenv.config();

const startServer = async () => {
  const app = express();

  await connectDB();

  // Allow access to both local frontend and Apollo Sandbox
  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL playground: http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
