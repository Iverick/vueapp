import Vue from 'vue';
import axios from 'axios';
import store from './store';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import HomePage from '../components/HomePage.vue';
import ListingPage from '../components/ListingPage.vue';


let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/listing/:listing', component: ListingPage, name: 'listing' }
  ],
  scrollBehavior (to, from, savedPosition) { 
    return { x: 0, y: 0 } 
  }
});

router.beforeEach((to, from, next) => {
  let serverData = JSON.parse(window.vuebnb_server_data);
  // If it encounters a change in the app route
  if (!serverData.path || to.path !== serverData.path) {
    // Load a data from the server using AJAX request and save it in the store
    axios.get(`/api${to.path}`).then(({ data }) => {
      store.commit('addData', {route: to.name, data});
      next();
    });
  } else {
    store.commit('addData', {route: to.name, data: serverData});
    next();
  }
});

export default router;