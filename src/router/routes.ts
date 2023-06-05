import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "Home",
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "首页"
        }
      },
      {
        path: "ranks",
        name: "Ranks",
        component: () => import("@/views/ranks/index.vue"),
        meta: {
          title: "排行榜"
        }
      },
      {
        path: "detail",
        name: "Detail",
        component: () => import("@/views/detail/index.vue"),
        meta: {
          title: "详情",
          noCache: true
        }
      }
    ]
  }
];

export default routes;
