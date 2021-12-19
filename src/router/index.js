import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Show from "../views/Show.vue";
import AddFixture from "../views/Show/AddFixture.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/show",
    name: "Show",
    component: Show,
  },
  {
    path: "/show/addFixture",
    name: "Add Fixture",
    component: AddFixture,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
