import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {Toaster} from "@incuca/vue3-toaster";
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import {createPinia} from 'pinia'
import moment from 'moment';

loadFonts()

const app = createApp(App)

app.config.globalProperties.$filters = {
    birthdate_format(value) {
        if (value) {
            return moment(String(value)).format('MMM DD, YYYY');
        } else {
            return 'N/A';
        }
    }
}

app.use(createPinia())
    .use(router)
    .use(vuetify)
    .use(Toaster);


app.mount('#app');