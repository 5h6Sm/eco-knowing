import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import router from './router/index.js';
import axios from './plugins/axios'; 
import store from './store';

library.add(fas, far);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store); 
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount('#app');
