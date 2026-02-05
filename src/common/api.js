let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/';

// Ensure baseURL ends with /
const finalBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';


export default async function FetchCypher43(endpoint, option = {}) {
    const token = sessionStorage.getItem("access_token");
    console.log("API Call:", endpoint, "Token found:", !!token); // DEBUG LOG
    const headers = { ...option.headers }; // Start with existing headers

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...option,
        headers
    };

    try {
        const res = await fetch(finalBaseURL + endpoint, config);

        // If 401 and we have a refresh token, try to refresh
        if (res.status === 401) {
            const refreshToken = sessionStorage.getItem("refresh_token");

            if (!refreshToken) {
                // No refresh token, throw error
                let errorMessage = "Not authorized, no token";
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    errorMessage = res.statusText;
                }
                throw new Error(errorMessage);
            }

            // Try to refresh token
            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const refreshRes = await fetch(finalBaseURL + 'api/auth/refresh-token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refreshToken })
                    });

                    if (!refreshRes.ok) {
                        throw new Error('Refresh token failed');
                    }

                    const data = await refreshRes.json();
                    sessionStorage.setItem("access_token", data.accessToken);
                    if (data.refreshToken) {
                        sessionStorage.setItem("refresh_token", data.refreshToken);
                    }

                    isRefreshing = false;
                    processQueue(null, data.accessToken);

                    // Retry original request with new token
                    headers['Authorization'] = `Bearer ${data.accessToken}`;
                    const retryConfig = { ...option, headers };
                    const retryRes = await fetch(finalBaseURL + endpoint, retryConfig);

                    if (!retryRes.ok) {
                        let errorMessage = "An error occurred";
                        try {
                            const errorData = await retryRes.json();
                            errorMessage = errorData.message || errorMessage;
                        } catch (e) {
                            errorMessage = retryRes.statusText;
                        }
                        throw new Error(errorMessage);
                    }

                    return retryRes.json();
                } catch (refreshError) {
                    isRefreshing = false;
                    processQueue(refreshError, null);

                    // Clear session and redirect to login
                    sessionStorage.clear();

                    // Check if on admin page or was admin
                    if (window.location.pathname.includes('/admin')) {
                        window.location.href = '/admin/login';
                    } else {
                        window.location.href = '/'; // Go to home for regular users since we use modal login
                    }

                    throw new Error('Session expired. Please login again.');
                }
            } else {
                // Wait for the refresh to complete
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(newToken => {
                    headers['Authorization'] = `Bearer ${newToken}`;
                    const retryConfig = { ...option, headers };
                    return fetch(finalBaseURL + endpoint, retryConfig).then(r => r.json());
                });
            }
        }

        if (!res.ok) {
            let errorMessage = "An error occurred";
            try {
                const errorData = await res.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                errorMessage = res.statusText;
            }
            throw new Error(errorMessage);
        }

        return res.json();
    } catch (error) {
        throw error;
    }
}

export async function UploadImageCypher43(file) {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(finalBaseURL + 'api/upload', {
        method: 'POST',
        body: formData
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
    }

    return res.json();
}