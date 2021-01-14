import "core-js/fn/object/assign";
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

Vue.component('image-carousel', {
  props: ['images'],

  template: `
    <div class="image-carousel">
      <img :src="images[index]" />
      <div class="controls">
        <carousel-control dir="left"></carousel-control>
        <carousel-control dir="right"></carousel-control>
      </div>
    </div> `,

  data() {
    return {
      index: 0
    }
  },

  computed: {
    image() {
      return this.images[this.index];
    }
  },

  components: {
    'carousel-control': {
      template: `<i :class="classes" @click="clicked"></i>`,

      props: ['dir'],

      computed: {
        classes() {
          return 'carousel-control fa fa-2x fa-chevron-' + this.dir;
        }
      },

      methods: {
        clicked() {
          this.$emit('change-image', this.dir === 'left' ? -1 : 1);
        }
      }
    }
  }
});

var app = new Vue({
  el: '#app',
  data: Object.assign(model, { 
    headerImageStyle: {
      'background-image': `url(${model.images[0]})`
    },
    contracted: true,
    modalOpen: false
  }),

  methods: {
    escapeKeyListener: function(evt) {
      if (evt.keyCode === 27 && this.modalOpen) {
        this.modalOpen = false;
      }
    }
  },

  watch: {
    modalOpen: function() {
      var className = 'modal-open';
      if (this.modalOpen) {
        document.body.classList.add(className);
      }
      else {
        document.body.classList.remove(className);
      }
    }
  },

  created:function() {
    document.addEventListener('keyup', this.escapeKeyListener);
  },

  destroyed: function () {
    document.removeEventListener('keyup', this.escapeKeyListener);
  }
});
