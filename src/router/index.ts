

import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import LibrosList from '@/pages/LibrosList.vue'
import LibrosForm from '@/pages/LibrosForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '/libros',
      name: 'libros',
      component: LibrosList
    },
    {
      path: '/libros/nuevo',
      name: 'libros-nuevo',
      component: LibrosForm
    }
  ]
})

export default router