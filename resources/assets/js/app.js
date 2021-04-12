import "core-js/fn/object/assign";
import Vue from 'vue';
import App from '../components/App.vue';
import ListingPage from '../components/ListingPage.vue';
import router from './router';
import store from './store';

var app = new Vue({
  el: '#app',

  render: h => h(App), router, store
});

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);
