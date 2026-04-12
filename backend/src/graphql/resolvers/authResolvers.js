/*
  Centennial College
  COMP308 - Emerging Technologies (SEC.403)
  Assignment 3 — Group 3

*/

const User = require('../../models/User');
const { hashPassword, comparePassword } = require('../../utils/hashPassword');
const generateToken = require('../../utils/generateToken');

const authResolvers = {
  // ─── Queries ────────────────────────────────────────────────────────────────

  Query: {
    /**
     * currentUser
     * Returns the logged-in user based on the JWT decoded in context.
     * Returns null (not an error) if the request is unauthenticated,
     * so the client can decide how to handle the anonymous state.
     */
    currentUser: async (_, __, { user }) => {
      if (!user) return null;

      try {
        // user.userId was embedded in the JWT by generateToken
        const foundUser = await User.findById(user.userId);
        return foundUser || null;
      } catch (err) {
        console.error('currentUser error:', err.message);
        return null;
      }
    },
  },

  // ─── Mutations ───────────────────────────────────────────────────────────────

  Mutation: {
    /**
     * register
     * Creates a new user account.
     * - Checks for duplicate email and username before saving.
     * - Hashes the plain-text password with bcrypt (10 salt rounds).
     * - Returns a JWT and the newly created user object.
     */
    register: async (_, { username, email, password }) => {
      try {
        // Normalize the email first and then check to prevent duplicate email
        const normalizedEmail = email.toLowerCase().trim();
        const emailTaken = await User.findOne({ normalizedEmail });
        if (emailTaken) {
          throw new Error('An account with this email already exists.');
        }

        // Prevent duplicate username
        const usernameTaken = await User.findOne({ username });
        if (usernameTaken) {
          throw new Error('This username is already taken.');
        }

        // Hash password before persisting
        const hashed = await hashPassword(password);

        // Create and save the user document
        const newUser = new User({
          username,
          email,
          password: hashed,
          // role defaults to "user"; authProvider defaults to "local" (see User model)
        });

        await newUser.save();

        // Issue a JWT for immediate use after registration
        const token = generateToken(newUser);

        return { token, user: newUser };

      } catch (err) {
        if (err.code === 11000) {
          if (err.keyPattern?.email) {
            throw new Error("An account with this email already exists.");
          }
          if (err.keyPattern?.username) {
            throw new Error("This username is already taken.");
          }
          throw new Error("A duplicate account already exists.");
        }
        throw err;
      }
    },

    /**
     * login
     * Authenticates a user with email + password.
     * - Uses a generic error message to avoid leaking whether the email exists.
     * - Returns a JWT and the user object on success.
     */
    login: async (_, { email, password }) => {
      // Look up the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password.');
      }

      // Compare the provided password against the stored hash
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password.');
      }

      // Issue a fresh JWT
      const token = generateToken(user);

      return { token, user };
    },

    /**
     * logout
     * JWT authentication is stateless: the token lives on the client.
     * True logout happens when the client discards the token.
     * This mutation exists so the client has a clean GraphQL endpoint to call,
     * and could be extended (e.g. token blacklist / server-side sessions) later.
     */
    logout: (_, __, { user }) => {
      if (!user) {
        // Already unauthenticated — still return true gracefully
        return true;
      }

      // No server-side session to destroy for JWT.
      // Client must delete the token from storage.
      return true;
    },
  },
};

module.exports = authResolvers;
