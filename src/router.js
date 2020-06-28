import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import PokeList from "./views/PokeList.vue";
import PokeGen from "./views/PokeGen.vue";
import PokeType from "./views/PokeType.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/pokemon-list",
      name: "pokelist",
      component: PokeList
    },
    {
      path: "/pokemon-generation",
      name: "pokegen",
      component: PokeGen
    },
    {
      path: "/pokemon-type",
      name: "poketype",
      component: PokeType
    }
  ]
});
