<template>
  <div class="home-layout">
    <div class="home-banner">
      <h1 class="banner-text">The Truecaller Blog</h1>
    </div>
    <section class="list-articles-wrapper">
      <h2 class="section-heading">Latest articles</h2>
      <custom-select
        :selectName="`categories`"
        :selectOptions="this.categories"
        :onChange="this.changeCategory"
      ></custom-select>
      <div class="list-articles-container">
        <post-card
          v-for="post in posts"
          :key="post.slug"
          :data="post"
        ></post-card>
      </div>
    </section>
  </div>
</template>

<script>
import CustomSelect from "../components/CustomSelect.vue";
import PostCard from "../components/PostCard.vue";
import { getPosts, getCategories } from "../apis/blog";
export default {
  name: "home-page",
  components: {
    CustomSelect,
    PostCard,
  },
  data() {
    return {
      category: "",
      pageNo: 1,
      categories: [],
      posts: [],
    };
  },
  created() {
    this.fetchCategories();
    this.fetchArticles();
  },
  watch: {
    pageNo: function () {
      this.fetchArticles();
    },
    category: function () {
      this.fetchArticles();
    },
  },
  methods: {
    changePageNo: function () {
      this.pageNo += 1;
    },
    changeCategory: function (event) {
      this.category = event.target.value;
    },
    fetchCategories: function () {
      getCategories()
        .then((res) => res.json())
        .then((data) => {
          let categories = [
            { name: "All Categories", slug: "" },
            ...data.categories,
          ];
          this.categories = categories;
        })
        .catch((err) => console.log(err));
    },
    fetchArticles: function () {
      getPosts(this.pageNo, this.category)
        .then((res) => res.json())
        .then((data) => {
          this.posts = data.posts;
        })
        .catch((err) => console.log(err));
    },
  },
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

.section-heading {
}

.list-articles-wrapper {
  padding: 5% 5%;
  background: #f7f8f9;
}

.list-articles-container {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  grid-gap: 30px;
}
</style>