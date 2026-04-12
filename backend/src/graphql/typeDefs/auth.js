/*
  Centennial College
  COMP308 - Emerging Technologies (SEC.403)
  Assignment 3 — Group 3

*/

const { gql } = require('apollo-server-express');

// GraphQL type definitions for authentication
const authTypeDefs = gql`
  # Represents a registered user in the system
  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    authProvider: String
  }

  # Returned after a successful register or login
  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    # Returns the currently authenticated user (requires valid JWT)
    currentUser: User
  }

  type Mutation {
    # Create a new account and receive a JWT
    register(username: String!, email: String!, password: String!): AuthPayload!

    # Sign in with email + password and receive a JWT
    login(email: String!, password: String!): AuthPayload!

    # Invalidate the session client-side (JWT is stateless; returns true on success)
    logout: Boolean!
  }
`;

module.exports = authTypeDefs;