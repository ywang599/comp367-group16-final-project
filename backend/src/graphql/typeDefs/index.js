/*
  Centennial College
  COMP308 - Emerging Technologies (SEC.403)
  Assignment 3 — Group 3

*/

const authTypeDefs = require('./auth');

// Combine all type definition modules into one array.
// Apollo Server accepts an array of DocumentNode / gql-tagged strings,
// so adding more feature typeDefs later is as simple as pushing to this list.
const typeDefs = [authTypeDefs];

module.exports = typeDefs;
