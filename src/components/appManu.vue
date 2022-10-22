<template>
  <div class="manu">
    <router-link to="/home"> 
       <div class="logo">  </div>
    </router-link>
      <div class="search">
          <input type="text" placeholder="Search" class="search-input" v-model="inputValue">
          <router-link :to="`/Searched/:${inputValue}`"> <div class="search-icon" > </div></router-link>
      </div>
  </div>
</template>

<script>
export default {
  inject: ["data"],
  data () {
    return{
      inputValue: ''
    }
  },
  methods: {
    log() {
     
    }
  },
  
}
</script>

<style>

</style>