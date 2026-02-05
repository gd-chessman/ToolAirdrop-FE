import FetchCypher43 from "@/common/api"

const CategoryService = {
    async getAll(query = {}) {
        const params = new URLSearchParams()
        if (query.type) params.append('type', query.type)
        // Add other params if needed
        const queryString = params.toString()
        const url = queryString ? `api/categories?${queryString}` : 'api/categories'

        const data = await FetchCypher43(url)
        return data.data
    },
    async create(data) {
        const res = await FetchCypher43('api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return res.data
    },
    async update(id, data) {
        const res = await FetchCypher43(`api/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return res.data
    },
    async delete(id) {
        const res = await FetchCypher43(`api/categories/${id}`, {
            method: 'DELETE'
        })
        return res.data
    }
}
export default CategoryService
