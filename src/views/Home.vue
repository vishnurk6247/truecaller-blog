<template>
  <div class="home-layout">
    <div class="home-banner">
      <h1 class="banner-text">The Truecaller Blog</h1>
    </div>
    <section class="list-articles-wrapper" id="uid-posts-section">
      <h2 class="section-heading">Latest articles</h2>
      <custom-select
        :selectName="`categories`"
        :selectOptions="this.categories"
        :onChange="this.changeCategory"
      ></custom-select>
      <div class="list-articles-container">
        <template v-if="postsLoading">
          <post-card-skeleton
            v-for="item in Array(12)"
            :key="item"
          ></post-card-skeleton>
        </template>
        <template v-else>
          <post-card
            v-for="post in posts"
            :key="post.slug"
            :data="post"
          ></post-card>
        </template>
      </div>
    </section>
    <div class="pagination-container">
      <paginator
        :currentPage="pageNo"
        :totalCount="totalPosts"
        :pageSize="20"
        :onChange="changePageNo"
        v-show="totalPosts > 20"
      ></paginator>
    </div>
  </div>
</template>

<script>
import CustomSelect from "../components/CustomSelect.vue";
import PostCard from "../components/PostCard.vue";
import PostCardSkeleton from "../components/PostCardSkeleton.vue";
import Paginator from "../components/Paginator.vue";
import { getPosts, getCategories } from "../apis/blog";
export default {
  name: "home-page",
  components: {
    "custom-select": CustomSelect,
    "post-card": PostCard,
    "post-card-skeleton": PostCardSkeleton,
    paginator: Paginator,
  },
  data() {
    return {
      category: "",
      pageNo: 1,
      categories: [],
      posts: [],
      totalPosts: 0,
      postsLoading: false,
    };
  },
  created() {
    this.fetchCategories();
    this.fetchArticles();
  },
  watch: {
    pageNo: function () {
      this.scrollToView();
      this.fetchArticles();
    },
    category: function () {
      this.scrollToView();
      this.fetchArticles();
    },
  },
  methods: {
    changePageNo: function (page) {
      this.pageNo = page;
    },
    changeCategory: function (event) {
      this.pageNo = 1;
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
      this.postsLoading = true;
      getPosts(this.pageNo, this.category)
        .then((res) => res.json())
        .then((data) => {
          this.posts = data.posts;
          this.totalPosts = data.found;
        })
        .catch((err) => console.log(err))
        .finally(() => (this.postsLoading = false));
    },
    scrollToView: function () {
      document.getElementById("uid-posts-section").scrollIntoView(true);
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
  width: 100vw;
  max-width: 100%;
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
}

.section-heading {
  font-size: 3rem;
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

.pagination-container {
  padding: 20px 0;
  width: 100%;
  background: #f7f8f9;
}

@media screen and (max-width: 480px) {
  .list-articles-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .banner-text {
    font-size: 2rem;
  }

  .section-heading {
    font-size: 2rem;
  }
}
</style>