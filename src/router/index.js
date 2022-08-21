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
      },
      {
        path: 'daftar-ayat-saya',
        name: 'AyatLists',
        component: () => import('@/views/AyatLists.vue'),
      },
      {
        path: 'penanda-saya',
        name: 'PenandaBaca',
        component: () => import('@/views/PenandaBaca.vue'),
      },
      {
        path: 'pencarian',
        name: 'Pencarian',
        component: () => import('@/views/Pencarian.vue'),
      },
      {
        path: 'ayat-untuk-kamu',
        name: 'RandomAyat',
        component: () => import('@/views/RandomAyat.vue'),
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
