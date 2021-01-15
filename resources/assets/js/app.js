import "core-js/fn/object/assign";
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';
import ImageCarousel from '../components/ImageCarousel.vue';
import ModalWindow from '../components/ModalWindow.vue';
import HeaderImage from '../components/HeaderImage.vue';

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);


var app = new Vue({
  el: '#app',

  components: {
    ImageCarousel,
    ModalWindow,
    HeaderImage
  },

  data: Object.assign(model, { 
    headerImageStyle: {
      'background-image': `url(${model.images[0]})`
    },
    contracted: true
  }),

  methods: {
    openModal() {
      this.$refs.imagemodal.modalOpen = true;
    }
  }
});
