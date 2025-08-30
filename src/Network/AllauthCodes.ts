// Define the actual values as a const object
export const ALLAUTH_CODES = {
    UNKNOWN_EMAIL: 'unknown_email',
    INVALID: 'invalid',
    CURRENT_PASSWORD_INCORRECT: 'enter_current_password',
    COMMON_PASSWORD: 'password_too_common',
    SIMILAR_PASSWORD: 'password_too_similar',
    PHONE_TAKEN: 'phone_taken',
    EMAIL_TAKEN: 'email_taken',
    DEFAULT_ERROR: 'default_error'
} as const;

// Create a type from the values
export type ALLAUTH_API_CODE = typeof ALLAUTH_CODES[keyof typeof ALLAUTH_CODES];

export function isAllauthCode(code: string): code is ALLAUTH_API_CODE {  
    return Object.values(ALLAUTH_CODES).includes(code as ALLAUTH_API_CODE);
}

export const AllauthCodeMessages: Record<ALLAUTH_API_CODE, string> = {
    unknown_email: 'This email is not associated with an account',
    invalid: 'Invalid Data Provided',
    enter_current_password: 'The current password is incorrect',
    password_too_common: 'The password you entered is too common. Please try again.',
    password_too_similar: 'The password cannot be same as your email. Please try again.',
    phone_taken: 'This phone is associated with an existing account. ',
    email_taken: 'This email is associated with an existing account. ',
    default_error: 'Something went wrong. Please try again later. ',
};

export function getErrorMessage(code: ALLAUTH_API_CODE): string {
    return AllauthCodeMessages[code] || AllauthCodeMessages.default_error;
}

// Helper function to get error message safely from any string
export function getAllauthErrorMessage(code: string): string {
    if (isAllauthCode(code)) {
        return getErrorMessage(code);
    }
    return AllauthCodeMessages.default_error;
}