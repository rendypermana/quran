import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    children:[
      {
        path: '',
        name: 'Surat',
        component: () => import('@/views/Surat.vue'),
      },
      {
        path: 'surah/:number',
        name: 'SuratSingle',
        component: () => import('@/views/SuratSingle.vue'),
      },
      {
        path: 'al-quran',
        name: 'SemuaSurat',
        component: () => import('@/views/SemuaSurat.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
