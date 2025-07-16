/**
 * Represents a user in the authentication system.
 *
 * @property {string} email - User's email address.
 * @property {string} firstName - User's first name.
 * @property {string} lastName - User's last name.
 */
export interface User {
  /**
   * User email
   */
  email: string;
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User password
   */
  password: string;
}

/**
 * Represents the authentication state.
 *
 * @property {User | null} user - The currently authenticated user, or null if not authenticated.
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @property {boolean} isLoading - Indicates if an authentication operation is in progress.
 * @property {string | null} error - Error message, if any.
 * @property {string | null} token - Authentication token, if available.
 */
export interface AuthState {
  /**
   * User
   */
  user: User | null;
  /**
   * Is authenticated
   */
  isAuthenticated: boolean;
  /**
   * Is loading
   */
  isLoading: boolean;
  /**
   * Error
   */
  error: string | null;
  /**
   * Token
   */
  token: string | null;
}

/**
 * Defines actions for authentication state management.
 */
export interface AuthActions {
  /**
   * Attempts to log in a user with the provided credentials.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} Resolves when login is complete.
   */
  login: (email: string, password: string) => Promise<void>;
  /**
   * Logs out the current user and clears authentication state.
   *
   * @returns {void}
   */
  logout: () => void;
  /**
   * Clears the current error message from the authentication state.
   *
   * @returns {void}
   */
  clearError: () => void;
  /**
   * Sets the current authenticated user.
   *
   * @param {User} user - The user object to set.
   * @returns {void}
   */
  setUser: (user: User) => void;
  /**
   * Sets the authentication token.
   *
   * @param {string} token - The authentication token to set.
   * @returns {void}
   */
  setToken: (token: string) => void;
  /**
   * Sets the loading state for authentication operations.
   *
   * @param {boolean} loading - True if loading, false otherwise.
   * @returns {void}
   */
  setLoading: (loading: boolean) => void;
  /**
   * Sets the error message for authentication state.
   *
   * @param {string} error - The error message to set.
   * @returns {void}
   */
  setError: (error: string) => void;
  /**
   * Validates the current authentication token expiration.
   *
   * @returns {boolean} True if token is valid, false otherwise.
   */
  validateToken: () => boolean;
}

/**
 * Combines authentication state and actions into a single store type.
 */
export type AuthStore = AuthState & AuthActions;
