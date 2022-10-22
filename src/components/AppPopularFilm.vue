<template>
  <div class="popular-film-div">
      
          <div class="films"
                v-for="(movie) in popularFilms" :key="movie"
                @mouseenter="movie.hover = true"
                @mouseleave="movie.hover = false"
      >
        <router-link :to="`/about/${movie.id}`">
            <div class="film-img">
            <img :src="imgPathDB+movie.poster_path" alt="" class="img">
            <div class=" WatchNow-backdrop" v-if="movie.hover" >
                <div class="watchNow"></div>
            </div>   
        </div>
        </router-link>
        <div class="film-name">
            {{movie.title}}
        </div>
        <div class="data-vote">
            <div class="data">
                {{movie.release_date}}
            </div>
            <div class="vote">{{movie.vote_average}}</div>
        </div>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted () {
        this.zaprosPopularFilm()
    },
    // inject: ['imgPathDB'],
    data() {
        return {
            hover: false,
            imgPathDB: 'https://image.tmdb.org/t/p/original',
            popularFilms: []
        }
    },
    methods: {
        async zaprosPopularFilm () {
            const response =  await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=4d6c6ca51430fa37ba6cc1c807a5c3e5&language=en-US&page=1')
            let arr = response.data.results
            this.popularFilms = arr.filter((el, i) => i < 4)

            if(this.popularFilms){
                console.log(this.popularFilms);
            }
            // console.log(this.imgPath());
        },
    }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.watchNow{
    background-image: url('../../photo/StopIcon.svg');
    background-repeat: no-repeat;
    width: 5vw;
    height: 3vw;
    /* position: absolute; */
    /* right: 8.2vw;
    height: 15vh; */
}
.WatchNow-backdrop{
   width: 16.5vw;
    height: 30vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    
    background: rgba(0, 0, 0, .35);
}
.popular-film-div{
    padding-top: 30px;
    width: 80vw;
    min-height: 38vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.films{
    cursor: pointer;
    width: 18.5vw;
    min-height: 38vh;
    background-color: #FF3D3D;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}
.film-img{
    padding-top: 10px;
    width: 16.5vw;
    height: 30vh;
    position: relative;
   
}
.film-name{
    min-height: 3vh;
    width: 18vw;
    color: cornsilk;
    font-size: 1vw;
    padding: 5px;
}
.data-vote{
    width: 18vw;
    min-height: 2vh;
    display: flex;
    justify-content: space-between;
    color: cornsilk;
    font-size: 1vw;
    padding: 2px;
}
.img{
    width: 16.5vw;
    height: 30vh;
}
/* .data{
    color: cornsilk;
} */

</style>