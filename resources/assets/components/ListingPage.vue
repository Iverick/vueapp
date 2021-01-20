<template>
  <div>

    <header-image 
      v-if="listing.images[0]" 
      :image-url="listing.images[0]" 
      @header-clicked="openModal" 
      :id="listing.id">

    </header-image>

    <div class="container">
      <div class="heading">
        <h1>{{ listing.title }}</h1>
        <p>{{ listing.address }}</p>
        <hr>

        <div class="about">
          <h3>About this listing</h3>
          <expandable-text>{{ listing.about }}</expandable-text>
        </div> <!-- about -->

        <div class="lists">
          <feature-list title="Amenities" :items="listing.amenities">
            <template slot-scope="amenity">
              <i class="fa fa-lg" v-bind:class="amenity.icon"></i>
              <span>{{ amenity.title }}</span>
            </template>
          </feature-list><!-- feature-list amenities-->

          <feature-list title="Prices" :items="listing.prices">
            <template slot-scope="price">
              {{ price.title }}:
              <strong>{{ price.value }} </strong>
            </template>
          </feature-list><!-- feature-list prices-->
        </div> <!-- lists -->

      </div> <!-- heading -->
    </div> <!-- container -->

    <modal-window ref="imagemodal">
      <image-carousel :images="listing.images"></image-carousel>
    </modal-window>

  </div> <!-- #app -->

</template>


<script>
  import { populateAmenitiesAndPrices } from '../js/helpers';

  import ImageCarousel from './ImageCarousel.vue';
  import ModalWindow from './ModalWindow.vue';
  import HeaderImage from './HeaderImage.vue';
  import FeatureList from './FeatureList.vue';
  import ExpandableText from './ExpandableText.vue';

  export default {
    components: {
      ImageCarousel,
      ModalWindow,
      HeaderImage,
      FeatureList,
      ExpandableText
    },

    computed: {
      listing() {
        let listing = this.$store.state.listings.find(
          listing => listing.id == this.$route.params.listing
        );

        return populateAmenitiesAndPrices(listing);
      }
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
