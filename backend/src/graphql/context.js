/*
  Centennial College
  COMP308 - Emerging Technologies (SEC.403)
  Assignment 3 — Group 3

*/

const auth = require('../middleware/auth');

/**
 * Apollo Server context function.
 *
 * Runs on every incoming request and attaches a `user` object to the context.
 * Resolvers can then read `context.user` to know who made the request.
 *
 * How it works:
 *  1. The auth middleware (completed by Yue Wang) reads the Authorization header.
 *  2. If a valid "Bearer <token>" is present it returns the decoded JWT payload
 *     { userId, email, role }.
 *  3. If the header is missing it returns null — unauthenticated requests are
 *     allowed through; individual resolvers enforce their own authorization.
 *  4. If the token exists but is invalid/expired the middleware throws. We catch
 *     that here so a bad token doesn't block every single request; the resolver
 *     will simply see user === null and can respond accordingly.
 *
 * @param {object} param0 - Express req/res injected by Apollo Server
 * @returns {{ user: object|null }}
 */
const context = ({ req }) => {
  let user = null;

  try {
    // auth() returns decoded JWT payload or null (no header)
    user = auth(req);
  } catch (err) {
    // Token was present but invalid or expired.
    // We don't throw here — protected resolvers handle auth errors themselves.
    console.warn('Context auth warning:', err.message);
  }

  return { user };
};

module.exports = context;
