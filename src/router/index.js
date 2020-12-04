import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import Home from '@/components/Home.vue'
import QuestionBox from '@/components/QuestionBox.vue'
import Result from '@/components/Result.vue'
import Profile from '@/components/Profile.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/question-box',
        name: 'question-box',
        component: QuestionBox,
        props: true
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { isPublic: true }
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: Signup,
        meta: { isPublic: true }
    },
    {
        path: '/result',
        name: 'result',
        component: Result,
        props: true
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        props: true
    }
]

const router =  new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // ...
    if (to.matched.some(record => !record.meta.isPublic) && !store.state.userInfo.auth) {
        console.log('未認証です');
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }
    else {
        next()
    }
  })

export default router;