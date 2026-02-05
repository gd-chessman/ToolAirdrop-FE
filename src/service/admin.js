import FetchCypher43 from "@/common/api";
import { Password } from "primevue";

export default {
    async login(identifier, password) {
        const payload = { password };
        if (identifier.includes('@')) {
            payload.email = identifier;
        } else {
            payload.username = identifier;
        }

        var userData = await FetchCypher43('api/auth/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return userData;
    }
}