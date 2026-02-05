import FetchCypher43 from '@/common/api';

const DashboardService = {
    async getStats(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `api/dashboard/stats${queryString ? `?${queryString}` : ''}`;
        return await FetchCypher43(url);
    }
};

export default DashboardService;
