import FetchCypher43 from "@/common/api"

export default  {
    async getAll() {
        const data = await FetchCypher43(`api/benefits`)
        return data.data
    }
}