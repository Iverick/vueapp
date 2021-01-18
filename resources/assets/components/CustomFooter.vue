<template>
  <div id="footer">
    <div class="hr">
      <div class="container">
        <p>
          <img src="/images/logo_grey.png" alt="" class="icon">
          <strong>Vuebnb</strong>. An app created using Vue.js and Laravel frameworks.
        </p>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    computed: {
      containerClass() {
        // this.$route.name  is  either  'home'  or  'listing'
        return `${this.$route.name}-container`;
      }
    }
  }  
</script>


<style> 
#footer { 
  margin-bottom:  3em;
} 

#footer .icon { 
  height: 23px; 
  display: inline-block; 
  margin-bottom: -6px; 
} 

.hr { 
  border-bottom: 1px solid #dbdbdb;  
  margin: 3em 0;  
} 

#footer p { 
  font-size: 15px; 
  color: #767676 !important;
  display: flex; 
}

#footer p img {
  padding-right: 6px;
}
</style>