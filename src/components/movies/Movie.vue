<template>
  <div>
    <div
      class="
        container
        flex flex-col
        md:flex-row
        lg:flex-row
        mx-auto
        mt-20
        border-b border-gray-600
        pb-2
      "
    >
      <div class="flex justify-center">
        <img :src="posterPath" alt="" class="w-64 pb-2" />
      </div>
      <div class="ml-2 md:ml-24 lg:ml-24">
        <h1 class="text-4xl font-semibold pb-2">{{ this.movie.title }}</h1>
        <span class="text-gray-500 text-sm flex">
          <svg
            class="fill-current text-yellow-500 w-4 mr-1"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <path
                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                data-name="star"
              />
            </g>
          </svg>
          {{ this.movie.vote_average * 10 }} % | {{ this.movie.release_date }}
          <span :key="index" v-for="(item, index) in movie.genres" class="ml-1">
            {{ item.name }}
            <span v-if="movie.genres.length - 1 != index">,</span>
          </span>
        </span>
        <p class="mt-5">
          {{ this.movie.overview }}
        </p>

        <div class="mt-5">
          <span class="mt-5">Featured Cast</span>
          <div class="flex">
            <div :key="index" v-for="(crew, index) in movie.credits.crew">
              <div v-if="index < 2" class="flex flex-col mt-5 mr-5">
                <span> {{ crew.name }} </span>
                <span class="text-gray-500">{{ crew.job }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <a
            @click.prevent="openYouTubeModel"
            target="blank"
            class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black"
          >
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
            </svg>
            <span class="ml-3">Play Trailer</span>
          </a>
          <a
            href="#here"
            @click="favouriteBtn()"
            class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black ml-5"
          >
            <img :src="heartIcon" />
            <span class="ml-3"> {{ displayText }} </span>
          </a>
        </div>
      </div>
    </div>

    <Cast :casts="movie.credits.cast" />
    <Images
      :images="movie.images.backdrops"
      v-on:on-image-click="showImageModel"
    />
    <MediaModel
      v-model="modelOpen"
      :mediaURL="mediaURL"
      :isVideo="this.isVideo"
    />
  </div>
</template>

<script>
import Cast from "./Cast";
import Images from "./Images";
import MediaModel from "../models/MediaModel";
export default {
  components: {
    Cast,
    Images,
    MediaModel,
  },
  data() {
    return {
      movie: {
        credits: {
          crew: {},
        },
        images: {
          backdrops: {},
        },
      },
      modelOpen: false,
      isVideo: false,
      mediaURL: "",
      displayText: JSON.parse(localStorage.getItem("favmovies") || "[]").some(
        (item) => item == this.$route.params.id
      )
        ? "Remove from favorites"
        : "Add to Favourites",
      heartIcon: JSON.parse(localStorage.getItem("favmovies") || "[]").some(
        (item) => item == this.$route.params.id
      )
        ? require("@/assets/images/heart-red.png")
        : require("@/assets/images/heart-white.png"),
    };
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchMovie(movieId) {
      const token = "fd2f21d28e9b0f2d3c1fd34f9e250c87";
      const response = await this.$http.get(
        "/movie/" +
          movieId +
          `?api_key=${token}&append_to_response=credits,videos,images`
      );
      this.movie = response.data;
    },
    openYouTubeModel() {
      this.mediaURL = this.youtubeVideo();
      this.isVideo = true;
      this.modelOpen = true;
    },
    openImageModel() {
      this.isVideo = false;
      this.modelOpen = true;
    },
    youtubeVideo() {
      if (!this.movie.videos) return;
      return (
        "https://www.youtube.com/embed/" + this.movie.videos.results[0].key
      );
    },
    showImageModel(imageFullPath) {
      this.mediaURL = imageFullPath;
      this.isVideo = false;
      this.modelOpen = true;
    },
    addToLocalStorage() {
      const favmovie = JSON.parse(localStorage.getItem("favmovies")) || [];
      favmovie.push(this.movie.id);
      localStorage.setItem("favmovies", JSON.stringify(favmovie));
    },
    removeFromLocalStorage() {
      const favmovie = JSON.parse(localStorage.getItem("favmovies")) || [];
      const index = favmovie.findIndex((item) => item == this.movie.id);
      if (index !== -1) favmovie.splice(index, 1);
      localStorage.setItem("favmovies", JSON.stringify(favmovie));
    },
    favouriteBtn() {
      this.isFavourite = JSON.parse(localStorage.getItem("favmovies") || "[]").some(
        (item) => item == this.$route.params.id
      );
      if (!this.isFavourite) {
        this.addToLocalStorage();
        this.displayText = "Remove from Favourites";
        this.heartIcon = require("@/assets/images/heart-red.png");
      } else {
        this.removeFromLocalStorage();
        this.displayText = "Add to Favourites";
        this.heartIcon = require("@/assets/images/heart-white.png");
      }
    },
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
};
</script>

<style>
</style>
