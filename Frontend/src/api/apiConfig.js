export const SERVER_URL = 'http://localhost:3000';
const BASE_URL = `${SERVER_URL}/api`;

export const fetchWithErrorHandling = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { ...options.headers };

  // אם זה FormData, אנחנו לא מוסיפים Content-Type (הדפדפן יעשה זאת לבד)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401 && token) {
      window.dispatchEvent(new Event('auth:expired'));
    }
    throw new Error(errorData.error || `שגיאת שרת: ${response.status}`);
  }
  return response.json();
};
