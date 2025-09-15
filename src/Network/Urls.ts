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
    PROFILE_UPDATE: '/api/update-user-profile/',
    QUICK_CHECK_LIST: '/api/loved-one/chat-row/',
    QUICK_CHECK_HISTORY: '/api/loved-one/{loved_one_id}/quickchecks/',
    LOVED_ONE_CREATE: '/api/loved-one/',
    QUICK_CHECK_CREATE: '/api/quick-check/',
    LOVED_ONE_DETAILS: '/api/loved-one/{id}/',
    LOVED_ONE_UPDATE: '/api/loved-one/{id}/',
    LOVED_ONE_DELETE: '/api/loved-one/{id}/',
    DELETE_ACCOUNT: '/api/delete-user-data/',
    UPLOAD_PROFILE_PIC: '/api/upload-profile-picture/',
    // Wallet and Payment endpoints
    CREATE_ORDER: '/api/payments/create-order/',
    VERIFY_PAYMENT: '/api/payments/verify-payment/',
    WALLET_BALANCE: '/api/wallet/',

    REMAINING_SCREENS: '/onboarding/remaining-screens/',
    
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_AND_CONDITIONS: '/terms-and-conditions',
    DATA_SAFETY: '/data-safety',
}

export function generateUrl(path: keyof typeof urls, params?: Record<string, string | number>) {
    let url = `${baseUrl}${urls[path]}`;
    
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`{${key}}`, String(value));
        });
    }
    
    return url;
}

