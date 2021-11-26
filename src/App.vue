<template>
  <div id="app">
    <TheHeader />
    <Home />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Home from "./views/Home.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    Home,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
