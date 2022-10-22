<template>
    <app-manu></app-manu>
    <div class="main">
        <div class="about">
            <div class="for-img">
                <img :src="info.poster_path==null?'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg':imgPathDB+info.poster_path" alt="" class="img">
            </div>
            <div class="info">
                <div class="film-name1">
                    <h1>{{info.original_title}}</h1>
                </div>
                <div class="data">
                    <h2>Data Realise:</h2>
                    <div class="data1"><h2>{{info.release_date}}</h2></div>
                </div>
                <div class="rating">
                    <div><h2>Rating:</h2></div>
                    <div class="num"><h2>{{info.vote_average}}</h2></div>
                </div>
                <div class="company">
                    <h2 class="directed">Directed by :</h2>
                    <div class="comp">
                        <h2 v-if="info.production_companies">{{info?.production_companies[0]?.name}}</h2>
                        <!-- production_companies -->
                    </div>
                </div>
                <div class="actors-container">
                    <div class="text-actors">Actors</div>
                    <div class="actors">
                        <div class="left"
                             @click="log2(id)"
                        ></div>
                        <div class="actors-name">
                            <div class="cont" :id="id">
                                <div class="actors-img-div" v-for="img in actorsInfo" :key="img">
                                    <img  
                                    v-if="img.profile_path!==undefined"
                                    :src="(img.profile_path===null) ?'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg':imgPathDB+img.profile_path"
                                    alt="" 
                                    class="actors-img">
                                    <div class="cont2">{{img.original_name}}</div>
                            </div>
                            </div>
                            
                        </div>
                        <div class="rigth" 
                             @click="log(id)"
                         ></div>
                    </div>
                </div>

            </div>
        </div>
        <div class="Trailers-div">
            <div class="Trailers-text">
                <p>Trailers</p>
            </div>
            <div class="Trailers">
                <div class="trailersImg" v-for="img in VideoInfo" :key="img">
                    <img :src="`http://img.youtube.com/vi/${img.key}/hqdefault.jpg`" alt="" class="trailersImg2">
                   <div class="stop-icon-border">
                        <div class="stop-icon"></div>
                   </div>
                </div>
            </div>

        </div>
        <div class="Similar-Films">
            <div class="text-similar">
                Similar Films
            </div>
            <div class="simiFilms">
                    <div class="films"
                        v-for="(movie) in serchedFilm" :key="movie"
                        @mouseenter="movie.hover = true"
                        @mouseleave="movie.hover = false"
                    >
                    <a :href="`/about/${movie.id}`">
                        <div class="film-img">
                            <img :src="movie.poster_path===null? 'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg':imgPathDB+movie.poster_path" alt="" class="img">
                            <div class=" WatchNow-backdrop" v-if="movie.hover" >
                                <div class="watchNow"></div>
                            </div>   
                        </div>
                </a>
                <div class="film-name">
                    {{movie.title}}
                </div>
                <div class="data-vote">
                    <div class="data2">
                        {{movie.release_date}}
                    </div>
                    <div class="vote">{{movie.vote_average}}</div>
                </div>


                 </div>
            </div>
        </div>

    </div>
    <app-footer></app-footer>
</template>

<script>
import AppManu from './../components/appManu'
import AppFooter from './../components/appFooter'
import axios from 'axios'
export default {
    mounted() {
        console.log(this.$route.params.kino_id);
        this.zaprosAbout()
        this.zaprosActors() 
       this.zaprosVideo()
       this.serchedZapros()
       console.log(this.$route.params);
        // let x = $(directed).scrollleft
        // console.log(x);
    },
    data() {
        return {
            videoUrl: `https://www.youtube.com/embed/`,
            trilerImg: `http://img.youtube.com/vi/{{kino_key}}/hqdefault.jpg`,
            info:{},
            id:'cont',
            actorsInfo:[],
            serchedFilm:[],
            VideoInfo:[],
            kinoId: this.$route.params.kino_id,
            imgPathDB: 'https://image.tmdb.org/t/p/original',
        }
    },
    methods: {
       async zaprosAbout() {
             const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.kinoId}?api_key=4d6c6ca51430fa37ba6cc1c807a5c3e5&language=en-US`)
            //  console.log(response.data);
             this.info = response.data
        },
        async zaprosActors() {
             const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.kinoId}/credits?api_key=4d6c6ca51430fa37ba6cc1c807a5c3e5`)
            //  console.log(response.data);
             this.actorsInfo = response.data.cast
            //  console.log(this.actorsInfo);
             
        },
        async zaprosVideo() {
             const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.kinoId}/videos?api_key=4d6c6ca51430fa37ba6cc1c807a5c3e5`)
            //  this.actorsInfo = response
            //    console.log(response.data.results);
               if(response.data.results.length<4) {
                    this.VideoInfo = response.data.results
               }
               else{
                   
                   this.VideoInfo = response.data.results.slice(0,4)
               }
            //    console.log(this.VideoInfo);
        },
         async serchedZapros() {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.kinoId}/similar?api_key=4d6c6ca51430fa37ba6cc1c807a5c3e5&language=en-US&page=1`)
            console.log(response.data.results);
            let data = response.data.results
            this.serchedFilm = data.slice(0, 4);
            console.log(data.slice(0, 4));
        },
        log(id) {
            let x = document.getElementById(id)
            x.scrollLeft+=1000/1920*1000 
        },
        log2(id) {
            let x = document.getElementById(id)
            x.scrollLeft-=1000/1920*1000 
        }
    },
components:{ AppManu,AppFooter }
}
</script>

<style scoped>
.about{
    width:80vw;
    min-height: 20vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.for-img{
    width:23vw;
    height: 33vw;
}
.info{
    width:48vw;
    min-height: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.img{
    width:23vw;
    height: 33vw;
    border-radius: 3%;
}
.film-name1{
   min-width: 5vw;
   font-size: 1.5vw;
    color:#FF3D3D;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
.text-actors{
    height: 2vw;
    font-size: 2vw;
    padding-bottom: 10px;
}
.stop-icon-border{
    width: 6vw;
    height: 6vw;
    border-radius: 50%;
    border: 10px solid white;
    position: absolute;
    bottom: 6vw;
    right: 6vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.stop-icon{
    background-image: url('../../photo/StopIcon.svg');
    width: 4vw;
    height: 4vh;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.data{
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    height: 5vw;
    width: 18vw;
    font-size: 1vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color:#FF3D3D;
}
.Trailers{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 20vw;
}
.trailersImg2{
    width: 18vw;
    height: 20vw;
     border: 2px solid white;
     border-radius: 10%;
}
.trailersImg{
    cursor: pointer;
    position: relative;
    width:18vw;
    height: 20vw;
    margin-right: 20px;
}
.actors-container{
    width: 48vw;
    min-height: 5vw;
    display: flex;
    flex-direction: column;
    color:#FF3D3D ;
}
.data1{
    color: seashell;
}
.rating{
     font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    height: 5vw;
    width: 8vw;
    font-size: 1vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color:#FF3D3D;
}
.actors-name2{
    color: silver;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1vw;
    width: inherit;
    height: 3vw;
     width: 16vw;
    padding-right: 25px;
}
.num{
    color: seashell;
}
.company{
     font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    height: 5vw;
    min-width: 8vw;
    font-size: 1vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color:#FF3D3D;
}
.directed{
    width: 10vw;
}
.comp{
    color: seashell;
    min-width: 10vw;
}
.actors-img-div{
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
    padding-right: 25px;
}
.actors-img{
     border-radius: 50%;
     padding-right: 5px;
    width: 13vw;
    height: 12vw;
}
.actors{
    width: 48vw;
    height: 16vw;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.left{
    cursor: pointer;
    background-image: url('../../photo/left.svg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 2vw;
    height: 4vw;
}
.cont2{
    width: inherit;
    display: flex;
    justify-content: center;
}
.cont{
    overflow: hidden;
    width: 44vw;
    height: 15vw;
    display: flex;
    flex-direction: row;
    padding-right: 10px;
    padding-left: 10px;
    scroll-behavior: smooth;
}

.actors-name{
     overflow: hidden;
    width: 44vw;
    height: 15vw;
    color: ivory;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
    padding-left: 10px;
}
.rigth{
    cursor: pointer;
    background-image: url('../../photo/rigth.svg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 2vw;
    height: 4vw;
}
.Trailers-div{
    width: 80vw;
    min-height: 30vh;
    display: flex;
    flex-direction: column;
}
.Trailers-text{
    display: flex;
    justify-content: center;
    font-size: 3vw;
    color: aliceblue;
}
.Similar-Films{
    width: 80vw;
   min-height: 40vh;
    color: ivory;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.simiFilms{
    width: 80vw;
   min-height: 38vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.text-similar{
    font-size: 3vw;
}
.films{
    cursor: pointer;
    margin-bottom: 20px;
    width: 18.5vw;
    min-height: 30vh;
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
.img{
    width: 16.5vw;
    height: 30vh;
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
.forVideoBig{
    position: fixed;
    margin:auto;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.7;
}
.videoDiv{
    display: flex;
    width: 50vw;
    height: 50vh;
    position: fixed;;
    top: 200px;
    left: 350px;
    justify-content: center;
    align-items: center;
}
</style>
