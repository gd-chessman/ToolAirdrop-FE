import authService from "@/service/auth";
import adminService from "@/service/admin";
import userService from "@/service/user";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(sessionStorage.getItem("access_token") || null);
    const refreshToken = ref(sessionStorage.getItem("refresh_token") || null);
    const user = ref(JSON.parse(sessionStorage.getItem("user_info") || "null"));
    const isAuthenticated = computed(() => !!token.value);

    async function login(email, password) {
        const response = await authService.login(email, password);
        // Lưu response vào user state và storage
        if (response && response.accessToken) {
            user.value = response;
            token.value = response.accessToken;
            refreshToken.value = response.refreshToken;
            sessionStorage.setItem("access_token", response.accessToken);
            sessionStorage.setItem("refresh_token", response.refreshToken);
            sessionStorage.setItem("user_info", JSON.stringify(response));
        }
        return response;
    }

    async function refreshAccessToken() {
        if (!refreshToken.value) {
            logout();
            throw new Error("Session expired");
        }
        try {
            const data = await authService.refreshToken(refreshToken.value);
            if (data && data.accessToken) {
                token.value = data.accessToken;
                sessionStorage.setItem("access_token", data.accessToken);
                if (data.refreshToken) {
                    refreshToken.value = data.refreshToken;
                    sessionStorage.setItem("refresh_token", data.refreshToken);
                }
                return data.accessToken;
            } else {
                throw new Error("Refresh failed");
            }
        } catch (e) {
            logout();
            throw e;
        }
    }

    async function loginAdmin(identifier, password) {
        const response = await adminService.login(identifier, password);
        // Lưu response vào user state và storage
        if (response && response.accessToken) {
            user.value = response;
            token.value = response.accessToken;
            refreshToken.value = response.refreshToken;
            sessionStorage.setItem("access_token", response.accessToken);
            sessionStorage.setItem("refresh_token", response.refreshToken);
            sessionStorage.setItem("user_info", JSON.stringify(response));
        }
        return response;
    }

    async function register(data) {
        return await authService.register(data);
    }

    async function verifyEmail(token) {
        return await authService.verifyEmail(token);
    }

    async function forgotPassword(email) {
        return await authService.forgotPassword(email);
    }

    async function resetPassword(token, password) {
        return await authService.resetPassword(token, password);
    }

    function logout() {
        user.value = null;
        token.value = null;
        refreshToken.value = null;
        trackedProducts.value = [];
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user_info");
    }

    // Tracking Logic
    const trackedProducts = ref([]);

    async function fetchTrackedProducts() {
        if (!token.value) return;
        try {
            const data = await userService.getTrackedProducts();
            trackedProducts.value = data || [];
        } catch (e) {
            console.error("Failed to fetch tracked products", e);
            if (e.message.includes("jwt expired") || e.message.includes("Unauthorized")) {
                try {
                    await refreshAccessToken();
                    const data = await userService.getTrackedProducts();
                    trackedProducts.value = data || [];
                } catch (refreshErr) {
                    // Already logged out by refreshAccessToken
                }
            }
        }
    }

    async function track(productId) {
        if (!token.value) throw new Error("Please login to track");
        try {
            const res = await userService.trackProduct(productId);
            await fetchTrackedProducts();
            return res;
        } catch (e) {
            if (e.message.includes("jwt expired") || e.message.includes("jwt")) {
                try {
                    await refreshAccessToken();
                    const res = await userService.trackProduct(productId);
                    await fetchTrackedProducts();
                    return res;
                } catch (refreshErr) {
                    throw new Error("Session expired. Please login again.");
                }
            }
            throw e;
        }
    }

    async function untrack(productId) {
        if (!token.value) throw new Error("Please login");
        try {
            const res = await userService.untrackProduct(productId);
            await fetchTrackedProducts();
            return res;
        } catch (e) {
            if (e.message.includes("jwt expired") || e.message.includes("jwt")) {
                try {
                    await refreshAccessToken();
                    const res = await userService.untrackProduct(productId);
                    await fetchTrackedProducts();
                    return res;
                } catch (refreshErr) {
                    throw new Error("Session expired. Please login again.");
                }
            }
            throw e;
        }
    }

    function isTracked(productId) {
        // trackedProducts can be objects (populated) or IDs (if we failed to populate). 
        // Backend `getTrackedProducts` populates.
        return trackedProducts.value.some(p => (p._id || p) === productId);
    }

    // Fetch User Profile
    async function fetchUserProfile() {
        if (!token.value) return;
        try {
            const userData = await userService.getProfile();
            if (userData) {
                // Merge new data with existing user object to keep structure if needed, or just replace
                // Here we assume getProfile returns the fresh user object
                user.value = { ...user.value, ...userData };
                sessionStorage.setItem("user_info", JSON.stringify(user.value));
            }
        } catch (e) {
            console.error("Failed to fetch user profile", e);
            if (e.message.includes("jwt expired") || e.message.includes("Unauthorized")) {
                try {
                    await refreshAccessToken();
                    const userData = await userService.getProfile();
                    if (userData) {
                        user.value = { ...user.value, ...userData };
                        sessionStorage.setItem("user_info", JSON.stringify(user.value));
                    }
                } catch (refreshErr) {
                    // Already logged out
                }
            }
        }
    }

    // Call fetch on init if logged in
    if (token.value) {
        fetchTrackedProducts();
        // Optionally fetch profile too to ensure up-to-date
        // fetchUserProfile(); 
    }

    return {
        token, user, login, loginAdmin, register, verifyEmail, forgotPassword, resetPassword, logout, isAuthenticated,
        trackedProducts, fetchTrackedProducts, track, untrack, isTracked, fetchUserProfile
    };
});
