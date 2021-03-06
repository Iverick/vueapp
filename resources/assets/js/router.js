import Vue from 'vue';
import axios from 'axios';
import store from './store';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import HomePage from '../components/HomePage.vue';
import ListingPage from '../components/ListingPage.vue';
import LoginPage from '../components/LoginPage.vue';
import SavedPage from '../components/SavedPage.vue';


let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/listing/:listing', component: ListingPage, name: 'listing' },
    { path: '/saved', component: SavedPage, name: 'saved' },
    { path: '/login', component: LoginPage, name: 'login' }
  ],
  scrollBehavior (to, from, savedPosition) { 
    return { x: 0, y: 0 } 
  }
});

router.beforeEach((to, from, next) => {
  let serverData = JSON.parse(window.vuebnb_server_data);
  if (to.name === 'listing' 
    ? store.getters.getListing(to.params.listing)
    : store.state.listing_summaries.length > 0 || to.name === 'login') {
    // If there is proper data for the '/listing' route in the store, or route is login, 
    // then continue without loading additional data from the server.
      next();
  }
  // If it encounters a change in the app route and needs to load data
  else if (!serverData.path || to.path !== serverData.path) {
    // Load a data from the server using AJAX request and save it in the store
    axios.get(`/api${to.path}`).then(({ data }) => {
      store.commit('addData', {route: to.name, data});
      next();
    });
  } else {
    // Load data about the listing and array of saved listings from the server
    store.commit('addData', {route: to.name, data: serverData});
    serverData.saved.forEach(id => store.commit('toggleSaved', id));
    next();
  }
});

export default router;