import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import router from './router/index.js';
import axios from './plugins/axios'; // 생성한 Axios 인스턴스를 import

library.add(fas, far);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.config.globalProperties.$axios = axios; // Vue 앱의 전역 속성에 등록
app.mount('#app');
