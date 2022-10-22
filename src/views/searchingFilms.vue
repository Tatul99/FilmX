<template>
    <div class="main2">
        <div class="minimain"
             v-if="active==='one'"
        >
            <div class="header">
           <router-link to="/home">  <div class="filmix"> </div></router-link>
            <div class="searched">
                
          <input type="text" placeholder="Search" class="searched-input" v-model="Value">
           <div class="searched-icon" @click="serchedZapros()"> </div>
            </div>
       </div>
       <div class="container" v-if="serchedFilm.length">
           <div class="films"
                v-for="(movie) in serchedFilm" :key="movie"
                @mouseenter="movie.hover = true"
                @mouseleave="movie.hover = false"
            >
           <router-link :to="`/about/${movie.id}`">
               <div class="film-img">
                    <img :src="movie.poster_path===null? 'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg':imgPathDB+movie.poster_path" alt="" class="img">
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
       <div class="eror" v-else>
            <p>The film does not found</p>
       </div>
        </div>
        <div class="minimain2"
             v-if="active==='two'"
        >
            <div class="header">
            <div class="filmix">

            </div>
            <div class="searched">
                
          <input type="text" placeholder="Search" class="searched-input" v-model="Value">
           <div class="searched-icon" @click="serchedZapros()"> </div>
            </div>
       </div>
        <div class="container" v-if="serchedFilm.length">
            <div class="films"
                    v-for="(movie) in serchedFilm2" :key="movie"
                    @mouseenter="movie.hover = true"
                    @mouseleave="movie.hover = false"
                >
            <router-link :to="`/about/${movie.id}/`">
                <div class="film-img">
                    <img :src="movie.poster_path===null? 'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg':imgPathDB+movie.poster_path" alt="" class="img">
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
     </div>
       <div class="numbers" v-if="serchedFilm.length>=12">
           <div class="num">
               <div class="one" 
                    @click="active = 'one'"
                    :class="active=== 'one'? 'active':''"
               >1</div>
           <div class="two" @click="active = 'two'"
                :class="active=== 'two'? 'active':''"
           >2</div>
           </div>
           
       </div>
    </div>
    <app-footer></app-footer>

</template>

<script>
import axios from 'axios'
 import AppFooter from './../components/appFooter'
export default {
    
    mounted() {
        console.log(this.searchedFilm);
        this.serchedZapros()
        // console.log(this.Value);
    },
    data() {
       return{ 
           active:'one',
           imgPathDB: 'https://image.tmdb.org/t/p/original',
        //    src:imgPathDB+ ,
           inputValue: '',
            Value: this.$route.params.value.substring(1,this.$route.params.value.length),
            serchedFilm: [],
            serchedFilm2: []
       }
    },
    // inject: ['data'],
    components: { AppFooter },
    methods:{
        log() {
            console.log(this.Value);
        },

       async serchedZapros() {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4d6c6ca51430fa37ba6cc1c807a5c3e5&query=${this.Value}`)
            console.log(response.data.results);
            let data = response.data.results
            this.serchedFilm = data.slice(0, 12);
            this.serchedFilm2 = data.slice(12);
        }
    }
}
</script>

<style scoped>
.main2{
   
    /* padding: 0 13.02083vw 0; */
    width: 80vw;
    min-height: 100vh;
    /* border: 1px solid white; */
    background-color: black;
    
   

}
.none{
    display: none;
}
.minimain{
    width: 80vw;
    min-height: 90vh;
}
.active{
    color:red;
}
.numbers{
    width: 80vw;
    height: 2vw;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    color: aliceblue;
}
.one{
    cursor: pointer;
}
.two{
    cursor: pointer;
}
.header{
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 8vw;
}
.num{
    display: flex;
    flex-direction: row;
    width: 5vw;
    justify-content: space-between;
    font-size: 25px;
}
.filmix{
    width: 10vw;
    height: 3vw;
    background-image: url('../../photo/logo.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.searched{
    padding-bottom: 10px;
    width: 80vw;
    height: 3vw;
    position: relative;
}
.searched-icon{
    cursor: pointer;
    position: absolute;
    top: 1vw;
    right: 3vw;
    width: 2vw;
    height: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../photo/search-icon.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.searched-input{
     background-color: transparent;
    position:absolute;
    width: 80vw;
    height: 3vw;
    color: white;
}
.container{
    width: 80vw;
    min-height: 30vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
.watchNow{
    background-image: url('../../photo/StopIcon.svg');
    background-repeat: no-repeat;
    width: 5vw;
    height: 3vw;
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
.films{
    cursor: pointer;
    margin-bottom: 20px;
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
.eror{
    width: 80vw;
    height: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
    font-size: 30px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
</style>