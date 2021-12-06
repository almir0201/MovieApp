import VueRouter from "vue-router"
import Home from "./components/front/Home.vue";
import Movie from "./components/movies/Movie.vue";
import Actors from "./components/actors/Actors";
import ActorDetail from "./components/actors/ActorDetail";
import FavouriteMovies from "./components/favouritemovies/FavouriteMovies";

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,

    },
    {
      path: "/movie/:id",
      name: "movie",
      component: Movie,
    },
    {
      path: "/actors",
      name: "actors",
      component: Actors,
    },
    {
      path: "/actor/:id",
      name: "actor",
      component: ActorDetail,
    },
    {
      path: "/favouritemovies",
      name: "favouritemovies",
      component: FavouriteMovies,
    }
  ]
});

export default router;
