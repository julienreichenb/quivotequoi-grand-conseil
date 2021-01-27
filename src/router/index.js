import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../components/Home"
import AllVotes from "../components/AllVotes"
import Vote from "../components/Vote"
import About from "../components/About"
import Error from "../components/Error"

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/vote/:id', component: Vote },
  { path: '/a-propos', component: About },
  { path: '/tous-les-votes', component: AllVotes },
  { path: '*', component: Error }
]

const router = new VueRouter({
  routes
})

export default router
