import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginSignupComponents/LoginPage.vue';
import LoginSignup from '../components/LoginSignup.vue';

const routes = [
  {
    path: '/',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/login', // LoginPage 컴포넌트와 연결할 경로, 소문자로 변경
    name: 'LoginPage',
    component: LoginPage
  }
  // 다른 페이지 경로 및 컴포넌트를 추가
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
