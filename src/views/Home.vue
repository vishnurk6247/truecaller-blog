<template>
  <div class="home-layout">
    <div class="home-banner">
      <h1 class="banner-text">The Truecaller Blog</h1>
    </div>
    <div class="list-blog-wrapper">
      <h2>Latest articles</h2>
      <select name="" id=""></select>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-page",
};
</script>

<style scoped>
.home-layout {
  height: auto;
  width: 100%;
}
.home-banner {
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  background: url("../assets/images/header.jpg");
  background-size: cover;
  background-position: center;
}

.banner-text {
  position: absolute;
  top: calc(50% - 64px);
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3.5rem;
  color: #fff;
}

.list-blog-wrapper {
  height: auto;
  width: 100%;
  padding: 100px 0;
  background: lightgrey;
}
</style>