import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

import axios from 'axios'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': window.csrf_token
}

export default new Vuex.Store({
  state: {
    // Stores list of listings save by the user
    saved: [],
    // Stores details about all listings
    listing_summaries: [],
    // Stores details about a specific listing
    listings: [],
    // Authentication status
    auth: false
  },

  mutations: {
    toggleSaved(state, id) {
      if (state.auth) {
        // If user logged in, then allow it to manipulate with the saved state
        let index = state.saved.findIndex(saved => saved === id);
        if (index === -1) {
          state.saved.push(id);
        } else {
          state.saved.splice(index, 1);
        }
      } else {
        // Redirect to the login page if user is not logged in
        router.push('/login');
      }
    },

    addData(state, { route, data }) {
      // save authentication data from the host
      if (data.auth) {
        state.auth = data.auth;
      }      
      // push the new data into the Vuex store
      if (route === 'listing') {
        state.listings.push(data.listing);
      } else {
        state.listing_summaries = data.listings;
      }
    }
  },

  actions: {
    toggleSaved({ commit, state }, id) {
      // Toggle only if user is logged in
      if (state.auth) {
        // Make a POST request to the server and update the state after request
        // promise is resolved.
        axios.post('/api/user/toggle_saved', { id })
          .then(
            () => commit('toggleSaved', id)
        );
      } else {
        // Redirect to the login page if user is not logged in
        router.push('/login');
      }
    }
  },

  getters: {
    getListing(state) {
      return id => state.listings.find(listing => id == listing.id);
    }
  }
});
