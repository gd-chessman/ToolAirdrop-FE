import FetchCypher43 from "@/common/api";

export default {
  async getTop(qty, type = "free") {
    const data = await FetchCypher43(`api/tools/top?qty=${qty}&type=${type}`);
    return data.data;
  },
  async getAll() {
    const data = await FetchCypher43(`api/tools`);
    console.log(data)
    return data.data;
  },
  async getById(id) {
    const data = await FetchCypher43(`api/tools/${id}`);
    return data.data || data;
  },
  async createTool(toolData) {
    const data = await FetchCypher43('api/tools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toolData)
    });
    return data;
  },
  async updateTool(id, toolData) {
    const data = await FetchCypher43(`api/tools/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toolData)
    });
    return data;
  },
  async deleteTool(id) {
    const data = await FetchCypher43(`api/tools/${id}`, {
      method: 'DELETE'
    });
    return data;
  }
};
