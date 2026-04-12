import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { getToken } from "../utils/token";

// HTTP connection to the GraphQL endpoint
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:5000/graphql",
});

// Attach JWT to every request header
const authLink = new SetContextLink((prevContext) => {
  const token = getToken();

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;