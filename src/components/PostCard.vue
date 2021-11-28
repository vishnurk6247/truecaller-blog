<template>
  <article class="post-card-container" @click="viewPost()">
    <header class="post-header">
      <h4
        class="post-category"
        v-for="category in postCategories"
        :key="category.ID"
      >
        {{ category.name }}
      </h4>
    </header>

    <div class="post-thumbnail">
      <img :src="data.post_thumbnail.URL" alt="" loading="lazy" />
    </div>
    <div class="post-content">
      <h1 class="post-title" :title="data.title">
        {{ renderTitle }}
      </h1>
      <time :datetime="data.date">{{ renderPostDate }}</time>
    </div>
  </article>
</template>

<script>
import moment from "moment";
export default {
  name: "post-card",
  props: {
    data: { type: Object, required: true },
  },
  created() {
    this.getCategories();
  },
  computed: {
    postCategories: function () {
      let categories = Object.values(this.data.categories).map((item) => {
        return item;
      });
      return categories;
    },
    renderPostDate: function () {
      return moment(this.data.date).fromNow();
    },
    renderTitle: function () {
      return this.data.title;
    },
  },
  methods: {
    viewPost: function () {
      this.$router.push(`/${this.data.slug}`);
    },
  },
};
</script>

<style scoped>
.post-card-container {
  height: 400px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 25px rgb(0 0 0 / 5%);
  cursor: pointer;
}

.post-card-container:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

.post-header {
  display: flex;
}

.post-category {
  font-size: 1rem;
  padding: 0 10px;
}

.post-category::before {
  content: "";
}

.post-thumbnail {
  height: 190px;
  width: 100%;
}

.post-thumbnail > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.post-content {
  padding: 10px 20px;
}

.post-title {
}
</style>