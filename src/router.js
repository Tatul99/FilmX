import {createRouter, createWebHistory } from 'vue-router'
import Searched from './views/searchingFilms'
import home from './home'
import about from './views/aboutFilm'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/Searched/:value', component: Searched },
        {path:'/home', component: home, alias:'/'},
        {path:'/about/:kino_id', component: about}
    ]
    
    
})


export default router