import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PostDetailedView from "../views/PostDetailedView.vue";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home-page",
      component: Home,
    },
    {
      path: "/post/:slug",
      name: "post-detailed-view",
      component: PostDetailedView,
    },
    {
      path: "*",
      name: "page-not-found",
      component: PageNotFound,
    },
  ],
});
