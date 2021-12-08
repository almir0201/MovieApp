<template>
  <div class="mx-5">
      <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold pb-2">
        Favourite Movies
      </h2>
      <a
        href="#"
        @click="fetchFavmovies()"
        class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black ml-5"
        >
        <img src="@/assets/images/heart-red.png" alt="" />
        <span class="ml-3"> Remove </span>
      </a>

      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <MovieItem :key="favmovie" v-for="favmovie in favmovie" :movie="movie" :genres="genres"/>
      </div>
  </div>
</template>

<script>
import MovieItem from "../items/MovieItem";
export default {
    components: {
      MovieItem,
    },

  data: function() {
    return {
      favmovie: [],
      genres: [],
      movies: [],
    };
  },

    async mounted() {
      this.fetchGenres();
      try {
        const token = "fd2f21d28e9b0f2d3c1fd34f9e250c87";
        const response = await this.$http.get(`/movie/popular?api_key=${token}`);
        this.movies = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },

  methods: {
    async fetchGenres() {
      // https://api.themoviedb.org/3/genre/movie/list
      try {
        const token = "fd2f21d28e9b0f2d3c1fd34f9e250c87";
        const response = await this.$http.get(`/genre/movie/list?api_key=${token}`);
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error);
      }
    },
      fetchFavmovies() {
        const favmovie = JSON.parse(localStorage.getItem("favmovies")) || [];
        localStorage.setItem("favmovies", JSON.stringify(favmovie));
        //const token = "fd2f21d28e9b0f2d3c1fd34f9e250c87";
        //const response = this.$http.get(`/movie/` + favmovie `?api_key=${token}`);
        //this.genres = response.data.genres;
        console.log(favmovie)
        console.log(this.movies)
    },
  }
};
</script>

<style>

</style>
