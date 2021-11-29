<template>
  <div class="not-found-container">
    <p class="not-found-msg">Oops, page not found!</p>
    <button @click="redirect" class="redirect-btn">Go back to home page</button>
  </div>
</template>

<script>
export default {
  name: "page-not-found",
  methods: {
    redirect: function () {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.not-found-container {
  position: relative;
  margin: 0 auto;
  min-height: calc(100vh - 64px);
  max-width: 1080px;
}

.not-found-msg {
  position: absolute;
  top: calc(45% - 64px);
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
}

.redirect-btn {
  position: absolute;
  top: calc(55% - 64px);
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  color: #0091ea;
  background: none;
  border: none;
  cursor: pointer;
}

.redirect-btn:hover {
  color: blue;
}
</style>