import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

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
      // Redirect to login page if user is not logged in
        router.push('/login');
      }
    },

    addData(state, { route, data }) {
      if (data.auth) {
        state.auth = data.auth;
      }

      if (route === 'listing') {
        state.listings.push(data.listing);
      } else {
        state.listing_summaries = data.listings;
      }
    }
  },

  getters: {
    getListing(state) {
      return id => state.listings.find(listing => id == listing.id);
    }
  }
});
