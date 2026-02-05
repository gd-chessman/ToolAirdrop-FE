import FetchCypher43 from "@/common/api"

const UserService = {
    // Get all users (Admin)
    async getAll(query = {}) {
        const params = new URLSearchParams();
        if (query.search) params.append('search', query.search);
        if (query.accountType) params.append('accountType', query.accountType);

        const res = await FetchCypher43(`api/users?${params.toString()}`)
        return res.data
    },

    // Update user account type (Admin)
    async updateStatus(id, data) {
        const res = await FetchCypher43(`api/users/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return res.data
    },

    // Track a product
    async trackProduct(productId) {
        const res = await FetchCypher43('api/users/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        })
        return res.data
    },

    // Untrack a product
    async untrackProduct(productId) {
        const res = await FetchCypher43(`api/users/track/${productId}`, {
            method: 'DELETE'
        })
        return res.data
    },

    // Get tracked products
    async getTrackedProducts() {
        const res = await FetchCypher43('api/users/tracked')
        return res.data
    },

    // Get my profile
    async getProfile() {
        const res = await FetchCypher43('api/users/profile')
        return res.data
    }
}

export default UserService
