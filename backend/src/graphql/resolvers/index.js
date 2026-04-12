/*
  Centennial College
  COMP308 - Emerging Technologies (SEC.403)
  Assignment 3 — Group 3

*/

const authResolvers = require('./authResolvers');

// Combine all resolver modules.
// As teammates add new feature resolvers, import them here and spread
// their Query / Mutation keys into the merged object below.
const resolvers = {
  Query: {
    ...authResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
};

module.exports = resolvers;
