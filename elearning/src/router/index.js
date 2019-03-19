/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Courses from '@/components/Courses'
import Course from '@/components/Course'
import MyCourses from '@/components/MyCourses'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/cursos',
      name: 'Cursos',
      component: Courses
    },
    {
      path: '/cursos/:id',
      name: 'Detalles',
      component: Course
    },
    {
      path: '/miscursos',
      name: 'MisCursos',
      component: MyCourses
    }
  ]
})
