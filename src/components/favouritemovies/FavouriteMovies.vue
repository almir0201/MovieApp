<template>
  <div class="container mx-auto">
      <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold pb-2">
        Favourite Movies
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <MovieItem :key="movie.id" v-for="movie in favmovies" :movie="movie" :genres="genres"/>
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
      favmovies: [],
    };
  },

    async mounted() {
      this.fetchGenres();
      try {
        var arrayOfValues = JSON.parse(localStorage.getItem("favmovies"));
        arrayOfValues.forEach(async (item) => {
          const token = "fd2f21d28e9b0f2d3c1fd34f9e250c87";
          const response = await this.$http.get(`/movie/` + item + `?api_key=${token}`)
          this.favmovies.push(response.data);
          console.log(this.favmovies)
        })
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
  }
};
</script>

<style>

</style>
