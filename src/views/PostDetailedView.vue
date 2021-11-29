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
      <div class="loader">
        <font-awesome-icon :icon="['fas', 'spinner']" />
      </div>
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
    document.getElementById("uid-app-header").scrollIntoView(true);
  },
  methods: {
    fetchPostDetails: function () {
      this.isLoading = true;
      getPostDetails(this.$route.params.slug)
        .then((res) => {
          if (res.status === 200) return res.json();
          else {
            this.$router.push("/page-not-found");
          }
        })
        .then((data) => {
          this.postDetails = data;
        })
        .catch((err) => console.log(err))
        .finally(() => (this.isLoading = false));
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

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(72deg);
  }
  40% {
    transform: rotate(144deg);
  }
  60% {
    transform: rotate(216deg);
  }
  80% {
    transform: rotate(288deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  height: 100%;
  width: 100%;
}

.loader > svg {
  height: 2em;
  width: 2em;
  animation: rotate 2s linear;
  animation-iteration-count: infinite;
}

.loader > svg > path {
  fill: #0091ea;
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

::v-deep figcaption {
  padding: 20px 0 30px 0;
  font-weight: bold;
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