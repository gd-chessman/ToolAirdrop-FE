import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(PrimeVue);
app.use(DialogService);


app.mount('#app')