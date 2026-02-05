import FetchCypher43 from "@/common/api"

const ProductService = {
    async getAllProduct(query) {
        const { limit = 9, page, sort, status, potential, difficulty, category } = query;
        const params = new URLSearchParams();

        if (limit) params.append('limit', limit);
        if (page) params.append('page', page);
        if (sort) params.append('sort', sort);

        // Handle array filters by joining with comma if they are arrays, or passing as is
        if (status && status.length) params.append('status', Array.isArray(status) ? status.join(',') : status);
        if (potential && potential.length) params.append('potential', Array.isArray(potential) ? potential.join(',') : potential);
        if (difficulty && difficulty.length) params.append('difficulty', Array.isArray(difficulty) ? difficulty.join(',') : difficulty);
        if (category && category.length) params.append('category', Array.isArray(category) ? category.join(',') : category);

        // console.log(params.toString())
        const data = await FetchCypher43(`api/products?${params.toString()}`)
        return data.data
    }
    ,
    async getProductById(id) {
        const data = await FetchCypher43(`api/products/${id}`)
        return data.data
    },
    async getTop(limit = 3) {
        const data = await FetchCypher43(`api/products/top?limit=${limit}`)
        return data.data
    },
    async getTotal() {
        const data = await FetchCypher43('api/products?limit=1')
        return data.pagination?.total || 0
    },
    async createProduct(productData) {
        const data = await FetchCypher43('api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        return data
    },
    async updateProduct(id, productData) {
        const data = await FetchCypher43(`api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        return data
    },
    async deleteProduct(id) {
        const data = await FetchCypher43(`api/products/${id}`, {
            method: 'DELETE'
        })
        return data
    }
}
export default ProductService