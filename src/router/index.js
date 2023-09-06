import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginSignupComponents/LoginPage.vue';
import SignUpPage from '../components/LoginSignupComponents/SignUpPage.vue';
import LoginSignup from '../components/LoginSignup.vue';
import MainComponent from '../components/MainComponent.vue';
import CreateWordlist from '../components/CreateWordlist.vue';
import StudyComponent from '../components/StudyComponent.vue';
import AdminComponent from '../components/AdminComponent.vue';

import store from '../store';

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
    path: '/home/:id',
    name: 'main',
    component: MainComponent,
    props: true
  },  
  {
    path: '/create_wordlist',
    name: 'CreateWordlist',
    component: CreateWordlist
  },
  {
    path: '/study/:listId',
    name: 'StudyComponent',
    component: StudyComponent,
    props: true
  },
  {
    path: '/admin',
    name: 'AdminComponent',
    component: AdminComponent,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (from.name === 'CreateWordlist' && to.name === 'main') {
    store.commit('setUserSavedWordlist', store.state.userSavedWordlist);
  }
  next();
});
export default router;
