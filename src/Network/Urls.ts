const baseUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}`;
const clientType = `${process.env.EXPO_PUBLIC_CLIENT_TYPE}`;

const urls = {
    CONFIG : `/api/_allauth/${clientType}/v1/config`,
    SIGNUP : `/api/_allauth/${clientType}/v1/auth/signup`,
    LOGIN : `/api/_allauth/${clientType}/v1/auth/login`,
    AUTH : `/api/_allauth/${clientType}/v1/auth/session`,
    TICKET_LIST : '/api/ticket-list/',
    STAFF_LIST : '/api/staff-list/',
    RESIDENT_LIST : '/api/resident-list/',
    SOCIETY_DETAILS : '/api/society-details/',
    SESSION_EXPIRY: '/api/session-expiry',
    CONSENT_STATUS: '/api/consent-status/',
    CONSENT_UPDATE: '/api/consent/',
    CONSENT_LIST: '/api/consent-list/',
    REQUEST_PASSWORD_RESET: `/api/_allauth/${clientType}/v1/auth/password/request`,
    VERIFY_CODE: `/api/_allauth/${clientType}/v1/auth/password/reset`,
    VERIFY_EMAIL: `/api/_allauth/${clientType}/v1/auth/email/verify`,
    RESEND_EMAIL_CODE: `/api/_allauth/${clientType}/v1/auth/email/verify/resend`,
    RESET_PASSWORD: `/api/_allauth/${clientType}/v1/auth/password/reset`,
    CHANGE_PASSWORD: `/api/_allauth/${clientType}/v1/account/password/change`,
    INVALID_TIMEFRAME: '/api/mark-invalid-timeframe/',
    MARK_AS_INVALID: '/api/mark-as-invalid/',
    PROFILE: '/api/user-profile/',
    QUICK_CHECK_LIST: '/api/loved-one/chat-row/',
    // Wallet and Payment endpoints
    CREATE_ORDER: '/api/payments/create-order/',
    VERIFY_PAYMENT: '/api/payments/verify-payment/',
    WALLET_BALANCE: '/api/wallet/',
}

export function generateUrl(path: keyof typeof urls) {
    return `${baseUrl}${urls[path]}`;
}

