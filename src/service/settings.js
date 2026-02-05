import FetchCypher43 from "@/common/api"

const SettingsService = {
    async get() {
        const data = await FetchCypher43('api/settings');
        return data; // returns { success: true, data: { socialLinks: ... } }
    },

    async update(settingsData) {
        const data = await FetchCypher43('api/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settingsData)
        });
        return data;
    }
}

export default SettingsService;
