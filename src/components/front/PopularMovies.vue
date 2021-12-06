<template>
  <div class="mx-5">
      <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold pb-2">
        Popular Movies
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <MovieItem :key="movie.id" v-for="movie in movies" :movie="movie" :genres="genres"/>
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
      movies: [],
      genres: [],
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
    }
  }
};
</script>

<style>

</style>
