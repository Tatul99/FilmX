<template>
  <div class="app-upcoming">
      <!-- <p v-for="movie in upComing" :key="`movie-${movie.id}`">
          {{movie.title}}
      </p> -->
      <div class="up-coming">
          <div class="first-upcoming">
                <div class="first-film" 
                
                >
                    <img :src="imgPathDB+firstFilm()" alt=""
                         class="first-film1"
                    >
                    <router-link :to="`/about/${upComing[0]?.id}`">
                   <div class="watchNow">
                       Watch Now
                   </div>
                    </router-link>
                </div>
          </div>
          <div class="up-coming-films" >
              <div
                 v-for="movie in imgPath()" :key="movie"
               class="seconds-films"
               @mouseenter="movie.hover = true"
               @mouseleave="movie.hover = false"
              >
                  <img :src="imgPathDB+movie.poster_path" alt="" class="seconds-films-img">
                    <div class=" WatchNow-backdrop"
                          
                          v-if="movie.hover"
                         >
                         <router-link :to="`/about/${movie?.id}`">
                            <div class="watchNow">
                            Watch Now
                            </div>
                         </router-link>
                  </div>   
              </div>
              
            
      </div>
     
  </div>
   <div class="text">
          <div class="text1">Watch everywhere.</div>
          <div class="text2">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    
    mounted () {
        this.zaprosUpComing();
        console.log(this.imgPath());
        console.log(this.firstFilm);   
        
    },
    data () {
        return {
            // hover:false,
            id:'',
            upComing: [],
            imgPathDB: 'https://image.tmdb.org/t/p/original'
        
           
        }
    },
    methods: {
        async zaprosUpComing () {
            const response =  await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=4d6c6ca51430fa37ba6cc1c807a5c3e5&language=en-US&page=1')
            this.upComing = response.data.results
            // console.log(this.upComing);
            // console.log(this.imgPath());
        },
          imgPath() {
            let arr = [] 
            for(let i=0;i<this.upComing.length;i++){
                if(i<4 && i>0){
                    arr.push(this.upComing[i])
                }  
            }
             return arr
        },
        firstFilm() {
            console.log(this.upComing);
            return this.upComing[0]?.poster_path
        },
        
       
    },
    computed:{
        //  firstFilm() {
        //     // return  this.upComing[0].poster_path
        // },
      
    },
//     provide () {
//     return {
//         imgPathDB: this.imgPathDB
//     }
//   }
}
</script>

<style scoped>
*{
    padding: 0%;
    margin: 0%;
}
.seconds-films-img{
     border-radius: 3%;
    width: 20vw;
    height: 9vw;
}
.text1{
    color: aliceblue;
    font-size: 25px;
    padding: 20px;
}
.text2{
   color: aliceblue; 
   padding: 20px;
   font-size: 20px;
}
.watchNow{
    cursor: pointer;
    background-color: #FF3D3D;
    border-radius: 5%;
    width: 13vw;
    height: 5vh;
    font-size: 2vw;
    color: aliceblue;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.seconds-films{
    position: relative;
}
.WatchNow-backdrop{
    width: 20vw;
    height: 9vw;
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    /* bottom: 0;
    left: 0; */
    background: rgba(0, 0, 0, .35);
}


</style>

