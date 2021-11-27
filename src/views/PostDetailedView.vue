<template>
  <div class="post-detailed-view">
    <div class="post-image-bg">
      <img :src="postDetails.featured_image" alt="" />
    </div>
    <div class="detailed-post-content">
      <h1 class="detailed-post-title">{{ postDetails.title }}</h1>
      <section
        v-html="postDetails.content"
        class="post-content-section"
      ></section>
    </div>
  </div>
</template>

<script>
import { getPostDetails } from "../apis/blog";
export default {
  name: "post-detailed-view",
  data() {
    return {
      postDetails: {},
    };
  },
  created() {
    this.fetchPostDetails();
  },
  methods: {
    fetchPostDetails: function () {
      getPostDetails(this.$route.params.slug)
        .then((res) => res.json())
        .then((data) => {
          this.postDetails = data;
        });
    },
  },
};
</script>

<style scoped>
.post-detailed-view {
  min-height: calc(100vh - 64px);
}

.post-image-bg {
  height: 70vh;
}

.post-image-bg > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.detailed-post-content {
  max-width: 1080px;
  margin: 0 auto;
  padding: 50px 20px;
}

.detailed-post-title {
  font-size: 3rem;
}

::v-deep a {
  background: none !important;
  text-decoration: none !important;
  color: #0087ff;
}

::v-deep p {
  line-height: 1.8;
}

::v-deep figure {
  margin: 0;
  max-width: 100%;
}

::v-deep iframe {
  max-width: 100%;
}

::v-deep img {
  max-width: 100%;
  object-fit: contain;
}

::v-deep p {
  max-width: 100%;
}
@media screen and (max-width: 480px) {
  .post-image-bg {
    height: auto;
  }
}
</style>