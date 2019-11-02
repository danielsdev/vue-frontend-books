import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/livros',
    name: 'listBooks',
    component: () => import('../views/Book/List.vue')
  },
  {
    path: '/livro/cadastrar',
    name: 'createBook',
    component: () => import('../views/Book/Form.vue')
  },
  {
    path: '/livro/editar/:id',
    name: 'editBook',
    component: () => import('../views/Book/Form.vue')
  },
  {
    path: '/capitulos/:bookId',
    name: 'listChapters',
    component: () => import('../views/Chapter/List.vue')
  },
  {
    path: '/capitulo/:bookId/cadastrar',
    name: 'createChapters',
    component: () => import('../views/Chapter/Form.vue')
  },
  {
    path: '/capitulo/:bookId/editar/:id',
    name: 'editChapters',
    component: () => import('../views/Chapter/Form.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
