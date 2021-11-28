<template>
  <div class="post-detailed-view">
    <template v-if="!isLoading">
      <div class="post-image-bg">
        <img :src="postDetails.featured_image" alt="" />
      </div>
      <div class="detailed-post-content">
        <h1 class="detailed-post-title">{{ postDetails.title }}</h1>
        <div class="post-info-container">
          <div class="author-img-container">
            <img :src="postDetails.author.avatar_URL" alt="" loading="lazy" />
          </div>
          <div class="post-info">
            <p class="author-name">{{ postDetails.author.name }}</p>
            <p>{{ renderPostDate }}</p>
          </div>
        </div>
        <section
          v-html="postDetails.content"
          class="post-content-section"
        ></section>
      </div>
    </template>
    <template v-else>
      <div class="loader">Loading...</div>
    </template>
  </div>
</template>

<script>
import { getPostDetails } from "../apis/blog";
import moment from "moment";

export default {
  name: "post-detailed-view",
  data() {
    return {
      postDetails: {},
      isLoading: false,
    };
  },
  computed: {
    renderPostDate: function () {
      return moment(this.postDetails.date).format("MMM DD, YYYY");
    },
  },
  created() {
    this.fetchPostDetails();
  },
  methods: {
    fetchPostDetails: function () {
      this.isLoading = true;
      getPostDetails(this.$route.params.slug)
        .then((res) => res.json())
        .then((data) => {
          this.postDetails = data;
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scoped>
.post-detailed-view {
  position: relative;
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

.post-info-container {
  display: flex;
  height: 80px;
  width: 300px;
}

.author-img-container {
  height: 80px;
  width: 80px;
}

.author-img-container img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.post-info {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-info p {
  margin: 0;
}

.author-name {
  font-weight: bold;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

::v-deep iframe,
::v-deep img,
::v-deep p,
::v-deep figure {
  max-width: 100%;
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
}

::v-deep img {
  object-fit: contain;
}

@media screen and (max-width: 480px) {
  .post-image-bg {
    height: auto;
  }

  .post-info-container {
    height: 60px;
  }

  .author-img-container {
    height: 60px;
    width: 60px;
  }

  .detailed-post-title {
    font-size: 2rem;
  }
}
</style>