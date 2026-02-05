import FetchCypher43 from "@/common/api"

const NewsService = {
    async getAll(query = {}) {
        const params = new URLSearchParams();

        Object.keys(query).forEach(key => {
            if (query[key] !== undefined && query[key] !== null) {
                params.append(key, query[key]);
            }
        });

        const data = await FetchCypher43(`api/news?${params.toString()}`);
        return data; // Endpoint returns { success: true, count: N, data: [] }
    },

    async getTags() {
        const data = await FetchCypher43('api/news/tags');
        return data;
    },

    async getById(id) {
        const data = await FetchCypher43(`api/news/${id}`);
        return data;
    },

    async create(newsData) {
        const data = await FetchCypher43('api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        });
        return data;
    },

    async update(id, newsData) {
        const data = await FetchCypher43(`api/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        });
        return data;
    },

    async delete(id) {
        const data = await FetchCypher43(`api/news/${id}`, {
            method: 'DELETE'
        });
        return data;
    }
}

export default NewsService;
