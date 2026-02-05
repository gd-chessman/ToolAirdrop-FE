import FetchCypher43 from "@/common/api";

export default {
    async register(data) {
        // data: { firstName, lastName, email, password }
        return await FetchCypher43('api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },

    async login(email, password) {
        return await FetchCypher43('api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
    },

    async verifyEmail(token) {
        return await FetchCypher43(`api/auth/verify-email/${token}`, {
            method: 'GET'
        });
    },

    async forgotPassword(email) {
        return await FetchCypher43('api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
    },

    async resetPassword(token, password) {
        return await FetchCypher43(`api/auth/reset-password/${token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
    },

    async refreshToken(refreshToken) {
        return await FetchCypher43('api/auth/refresh-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });
    }
}
