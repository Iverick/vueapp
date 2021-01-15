<template>
  <div class="image-carousel">
      <img :src="image" />
      <div class="controls">
        <carousel-control dir="left" @change-image="changeImage"></carousel-control>
        <carousel-control dir="right" @change-image="changeImage"></carousel-control>
      </div>
    </div>
</template>


<script>
  import CarouselControl from './CarouselControl.vue';

  export default {
    components: {
      CarouselControl
    },

    props: ['images'],

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

    methods: {
      changeImage(val) {
        let newVal = this.index + parseInt(val);
        if (newVal < 0) {
          // Display last image
          this.index = this.images.length - 1;
        }
        else if (newVal === this.images.length) {
          // Display first image
          this.index = 0;
        } else {
          // Display image with an index equal to the given newValue 
          this.index = newVal;
        }
      }
    }
  }
</script>


<style>
  .image-carousel {
    height: 100%; 
    margin-top: -12vh;  
    position: relative; 
    display: flex;
    align-items: center; 
    justify-content: center;
  }

  .image-carousel img { 
    width: 100%; 
  }

  .image-carousel .controls { 
    position: absolute; 
    width: 100%; 
    display: flex;
    justify-content: space-between;
  }

</style>