<template>
  <div class="post-card-container">
    <div class="post-text"></div>

    <div class="post-thumbnail"></div>
    <div class="post-content">
      <div class="post-text"></div>
      <div class="post-text"></div>
      <div class="post-date"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post-card-skeleton",
};
</script>

<style scoped>
@keyframes pulse {
  0% {
    background-color: rgba(0, 0, 0, 0.05);
  }

  50% {
    background-color: rgba(0, 0, 0, 0.1);
  }

  100% {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.post-card-container {
  height: 400px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 25px rgb(0 0 0 / 5%);
}

.post-text {
  margin: 0 auto;
  margin-top: 10px;
  height: 30px;
  width: calc(100% - 40px);
  animation: pulse 1s infinite ease-in-out;
  animation-iteration-count: infinite;
}

.post-thumbnail {
  margin-top: 10px;
  height: 175px;
  width: 100%;
  animation: pulse 1s infinite ease-in-out;
  animation-iteration-count: infinite;
}

.post-content {
  width: 100%;
}

.post-date {
  margin-left: 20px;
  margin-top: 10px;
  height: 20px;
  width: 150px;
  animation: pulse 1s infinite ease-in-out;
  animation-iteration-count: infinite;
}
</style>