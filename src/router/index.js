import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/notes",
    name: "OnlineNotes",
    component: () => import("../views/OnlineNotes.vue"),
  },
  {
    path: "/departments",
    name: "Departments",
    component: () => import("../views/Departments.vue"),
  },
  {
  path: "/photo-description",
  name: "PhotoDescription",
  component: () => import("../views/PhotoDescription")
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
