
export default {
    async getAll() {
        const data = await FetchCypher43(`api/huntingtiers`)
        return data.data
    }
}