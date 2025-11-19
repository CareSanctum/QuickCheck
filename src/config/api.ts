// API Configuration
export const API_CONFIG = {
  // Base URL for your backend
  BASE_URL: 'http://localhost:8000',
  
  // API Endpoints
  ENDPOINTS: {
    CREATE_ORDER: '/api/payments/create-order/',
    VERIFY_PAYMENT: '/api/payments/verify-payment/',
  },
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Authentication
  AUTH_TOKEN: 'YOUR_TOKEN_HERE', // Replace with actual token
  USER_ID: '1234', // Replace with actual user ID
};

// Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (csrfToken: string) => {
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    'Authorization': `Bearer ${API_CONFIG.AUTH_TOKEN}`,
    'X-CSRFToken': csrfToken,
  };
}; 