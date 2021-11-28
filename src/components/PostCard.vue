<template>
  <article class="post-card-container" @click="viewPost()">
    <header class="post-header">
      <div
        class="post-categories-container"
        v-for="category in postCategories"
        :key="category.ID"
      >
        <div
          class="category-bullet"
          :style="{ background: `${colorMap.get(category.slug)}` }"
        ></div>
        <h4 class="post-category">
          {{ category.name }}
        </h4>
      </div>
    </header>

    <div class="post-thumbnail">
      <img :src="imgSrc" alt="post-image" loading="lazy" />
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
import { categoryColor } from "../utils/categoryHelper";
export default {
  name: "post-card",
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      colorMap: null,
    };
  },
  created() {
    this.initialiseColorMap();
  },
  computed: {
    postCategories: function () {
      let categories = Object.values(this.data.categories).map((item) => {
        return item;
      });
      return categories.slice(0, 2);
    },
    renderPostDate: function () {
      return moment(this.data.date).fromNow();
    },
    renderTitle: function () {
      return this.data.title.length > 45
        ? this.data.title.slice(0, 45) + "..."
        : this.data.title;
    },
    imgSrc: function () {
      return this.data?.post_thumbnail?.URL;
    },
  },
  methods: {
    viewPost: function () {
      this.$router.push(`/${this.data.slug}`);
    },
    initialiseColorMap: function () {
      this.colorMap = categoryColor();
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

.post-card-container:hover .post-title {
  color: #0091ea;
}

.post-header {
  display: flex;
  padding: 0 10px;
}

.post-header > .post-categories-container {
  margin-left: 15px;
}

.post-categories-container {
  display: flex;
  align-items: center;
}

.post-category {
  font-size: 1rem;
  padding-left: 10px;
}

.category-bullet {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: lightblue;
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
  height: 46px;
}
</style>