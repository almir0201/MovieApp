<template>
  <div id="app">
      <div class="flex flex-col justify-center items-center md:flex-row lg:flex-row justify-between border-b border-gray-500">
        <Navbar />
        <Searchbar />
      </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/header/Navbar";
import Searchbar from "./components/header/Searchbar";
export default {
  name: "App",
  components: {
    Navbar,
    Searchbar,
  }
};
</script>

<style>

</style>
