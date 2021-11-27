<template>
  <div class="home-layout">
    <div class="home-banner">
      <h1 class="banner-text">The Truecaller Blog</h1>
    </div>
    <section class="list-articles-wrapper">
      <h2 class="section-heading">Latest articles</h2>
      <custom-select
        :selectName="categories"
        :selectOptions="this.categories"
      ></custom-select>
      <div class="list-articles-container">
        <post-card
          v-for="post in posts"
          :key="post.name"
          :data="post"
        ></post-card>
      </div>
    </section>
  </div>
</template>

<script>
import CustomSelect from "../components/CustomSelect.vue";
import PostCard from "../components/PostCard.vue";
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
    this.fetchArticles(this.pageNo, this.category);
  },
  watch: {
    pageNo: function () {
      this.fetchArticles(this.pageNo, this.category);
    },
    category: function () {
      this.fetchArticles(this.pageNo, this.category);
    },
  },
  methods: {
    changePageNo: function () {
      this.pageNo += 1;
    },
    fetchCategories: function () {
      fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories"
      )
        .then((res) => res.json())
        .then((data) => {
          this.categories = data.categories;
        })
        .catch((err) => console.log(err));
    },
    fetchArticles: function (page, category) {
      fetch(
        `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?fields=slug,categories,post_thumbnail,title,date&number=20&page=${page}&category=${category}`
      )
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
  grid-gap: 20px;
}
</style>