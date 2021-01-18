<template>
  <div>

    <header-image v-if="images[0]" :image-url="images[0]" @header-clicked="openModal">

    </header-image>

    <div class="container">
      <div class="heading">
        <h1>{{ title }}</h1>
        <p>{{ address }}</p>
        <hr>

        <div class="about">
          <h3>About this listing</h3>
          <expandable-text>{{ about }}</expandable-text>
        </div> <!-- about -->

        <div class="lists">
          <feature-list title="Amenities" :items="amenities">
            <template slot-scope="amenity">
              <i class="fa fa-lg" v-bind:class="amenity.icon"></i>
              <span>{{ amenity.title }}</span>
            </template>
          </feature-list><!-- feature-list amenities-->

          <feature-list title="Prices" :items="prices">
            <template slot-scope="price">
              {{ price.title }}:
              <strong>{{ price.value }} </strong>
            </template>
          </feature-list><!-- feature-list prices-->
        </div> <!-- lists -->

      </div> <!-- heading -->
    </div> <!-- container -->

    <modal-window ref="imagemodal">
      <image-carousel :images="images"></image-carousel>
    </modal-window>

  </div> <!-- #app -->

</template>


<script>
  import { populateAmenitiesAndPrices } from '../js/helpers';
  import routeMixin from '../js/route-mixin';

  import ImageCarousel from './ImageCarousel.vue';
  import ModalWindow from './ModalWindow.vue';
  import HeaderImage from './HeaderImage.vue';
  import FeatureList from './FeatureList.vue';
  import ExpandableText from './ExpandableText.vue';

  export default {
    mixins: [ routeMixin ],

    data() {
      return { 
        title: null,
        about: null, 
        address: null, 
        amenities: [], 
        prices: [], 
        images: [] 
      }
    },

    components: {
      ImageCarousel,
      ModalWindow,
      HeaderImage,
      FeatureList,
      ExpandableText
    },

    methods: {
      // Implement assignData function declared in the routeMixin
      assignData({ listing }) {
        Object.assign(this.$data, populateAmenitiesAndPrices(listing));
      },

      openModal() {
        this.$refs.imagemodal.modalOpen = true;
      }
    }
  }
</script>


<style> 
  .about { 
    margin-top: 2em;  
  } 

  .about h3 { 
    font-size: 22px; 
  } 
</style>
