import FetchCypher43 from "@/common/api"

const SubscriberService = {
    async subscribe(email) {
        const data = await FetchCypher43('api/subscribers/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        return data
    },
    async getAllSubscribers() {
        const data = await FetchCypher43('api/subscribers')
        return data
    }
}

export default SubscriberService
