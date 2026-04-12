// The key used in localStorage — defined once so nothing else hardcodes it
const TOKEN_KEY = "token";

// Save the JWT string returned by login/register into localStorage
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Read the JWT back out (returns null if not logged in)
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Delete the JWT — used on logout
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
