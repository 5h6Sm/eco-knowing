import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginSignupComponents/LoginPage.vue';
import SignUpPage from '../components/LoginSignupComponents/SignUpPage.vue';
import LoginSignup from '../components/LoginSignup.vue';
import MainComponent from '../components/MainComponent.vue';

const routes = [
  {
    path: '/',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/login', 
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/home',
    name: 'MainComponent',
    component: MainComponent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
