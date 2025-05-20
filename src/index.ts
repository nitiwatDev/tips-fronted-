import { createWebHistory, createRouter } from "vue-router";
import ParentView from "@/views/ParentCom.vue";
import StyleCom from "@/views/StyleCom.vue";
import Home from "@/views/Home.vue";
import ThreeD from "./views/ThreeD.vue";
import Ref from "./views/Ref.vue";
import Navbar from "./views/Navbar.vue";
import Navbar2 from "./views/Navbar2.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "home",
    },
  },
  {
    path: "/parent",
    name: "parent",
    component: ParentView,
    meta: {
      title: "parent",
    },
  },
  {
    path: "/style",
    name: "style",
    component: StyleCom,
    meta: {
      title: "style",
    },
  },
  {
    path: "/3d",
    name: "3d",
    component: ThreeD,
    meta: {
      title: "3D",
    },
  },
  {
    path: "/ref",
    name: "ref",
    component: Ref,

    meta: {
      title: "ref",
    },
  },
  {
    path: "/navbar",
    name: "navbar",
    component: Navbar,

    meta: {
      title: "navbar",
    },
  },
  {
    path: "/navbar2",
    name: "navbar2",
    component: Navbar2,

    meta: {
      title: "navbar2",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = (to.meta?.title as string) || "Vue3";
  next();
});

export default router;
