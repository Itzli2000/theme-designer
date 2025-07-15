/**
 * Represents the data required for user registration.
 *
 * @property {string} firstName - User's first name.
 * @property {string} lastName - User's last name.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 * @property {string} confirmPassword - Confirmation of the user's password.
 */
export interface RegisterFormData {
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User email
   */
  email: string;
  /**
   * User password
   */
  password: string;
  /**
   * User confirm password
   */
  confirmPassword: string;
}

/**
 * Represents the state of the registration process.
 *
 * @property {boolean} isLoading - Indicates if a registration operation is in progress.
 * @property {string | null} error - Error message, if any.
 * @property {boolean} success - Indicates if registration was successful.
 * @property {RegisterFormData} formData - The current registration form data.
 */
export interface RegisterState {
  /**
   * Is loading
   */
  isLoading: boolean;
  /**
   * Error
   */
  error: string | null;
  /**
   * Success
   */
  success: boolean;
  /**
   * Form data
   */
  formData: RegisterFormData;
}

/**
 * Defines actions for registration state management.
 */
export interface RegisterActions {
  /**
   * Attempts to register a new user with the provided form data.
   *
   * @param {RegisterFormData} formData - The registration form data.
   * @returns {Promise<void>} Resolves when registration is complete.
   */
  register: (formData: RegisterFormData) => Promise<void>;
  /**
   * Updates a specific field in the registration form data.
   *
   * @param {keyof RegisterFormData} field - The field to update.
   * @param {string} value - The new value for the field.
   * @returns {void}
   */
  updateFormData: (field: keyof RegisterFormData, value: string) => void;
  /**
   * Resets the registration form to its initial state.
   *
   * @returns {void}
   */
  resetForm: () => void;
  /**
   * Clears the current error message from the registration state.
   *
   * @returns {void}
   */
  clearError: () => void;
  /**
   * Clears the success state from the registration state.
   *
   * @returns {void}
   */
  clearSuccess: () => void;
  /**
   * Sets the loading state for registration operations.
   *
   * @param {boolean} loading - True if loading, false otherwise.
   * @returns {void}
   */
  setLoading: (loading: boolean) => void;
  /**
   * Sets the error message for registration state.
   *
   * @param {string} error - The error message to set.
   * @returns {void}
   */
  setError: (error: string) => void;
  /**
   * Sets the success state for registration.
   *
   * @param {boolean} success - True if registration was successful, false otherwise.
   * @returns {void}
   */
  setSuccess: (success: boolean) => void;
}

/**
 * Combines registration state and actions into a single store type.
 */
export type RegisterStore = RegisterState & RegisterActions;
