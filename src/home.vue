<template>
  <div class="main">
    <app-manu
        @log="log"
    ></app-manu>
    <router-view></router-view>
    <app-up-coming></app-up-coming>

    <div class="popular-film">
      <p class="text">Most Popular Films</p>
      <app-popular-film></app-popular-film>
      <p class="text">Most Rated Films</p>
      <app-rated-film></app-rated-film>
    </div>
  </div>
  <app-footer></app-footer>
</template>

<script>
import AppManu from './components/appManu'
import AppUpComing from './components/AppUpComing'
import AppPopularFilm from './components/AppPopularFilm'
import AppRatedFilm from './components/AppRatedFilm'
import AppFooter from './components/appFooter.vue'
export default {
 mounted() {
    //  console.log(this.value);
 },
data() {
    return {

        
    }
},
methods:{
    // log(data1) {
    //     this.data= data1
    //     console.log(this.data);
    // }
},
  components: { AppManu,AppUpComing,AppPopularFilm,AppRatedFilm,AppFooter },
//   provide() {
//       return {
//           data:this.data
//       }
//   }
}
</script>

<style scoped>
  .text{
    padding-top: 20px;
    color: #f0f8ff;
    font-size: 35px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  
</style>
