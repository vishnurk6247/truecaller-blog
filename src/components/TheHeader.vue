<template>
  <header class="app-header" id="uid-app-header">
    <div class="header-logo-container">
      <a href="/" class="app-logo">Truecaller</a>
    </div>
  </header>
</template>

<script>
export default {
  name: "the-header",
};
</script>

<style scoped>
.app-header {
  height: 64px;
  width: 100%;
  background: #fff;
}

.header-logo-container {
  height: 100%;
  width: 140px;
  margin-left: 30px;
}

.app-logo {
  background-image: url("../assets/icons/truecaller.svg");
  color: transparent;
  background-size: 140px 64px;
  background-position: left center;
  background-repeat: no-repeat;
  display: block;
  width: 140px;
  height: 64px;
}
</style>