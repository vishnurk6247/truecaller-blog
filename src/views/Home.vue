<template>
  <div class="home-layout">
    <div class="home-banner">
      <h1 class="banner-text">The Truecaller Blog</h1>
      <font-awesome-icon
        :icon="['fas', 'chevron-down']"
        class="scroll-down-arrow"
        @click="scrollToView"
      />
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
            v-for="item in Array.from(Array(12).keys())"
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
    this.fetchArticles(this.category);
  },
  watch: {
    pageNo: function () {
      this.scrollToView();
      this.fetchArticles(this.category);
    },
    category: function () {
      this.scrollToView();
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
        .then((res) => {
          if (res.status === 200) return res.json();
        })
        .then((data) => {
          let categories = [
            { name: "All Categories", slug: "" },
            ...data.categories,
          ];
          this.categories = categories;
        })
        .catch((err) => console.log(err));
    },
    fetchArticles: function (category) {
      this.postsLoading = true;
      getPosts(this.pageNo, category)
        .then((res) => {
          if (res.status === 200) return res.json();
        })
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
  top: calc(45% - 64px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  max-width: 100%;
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 2px rgb(0 0 0 / 30%);
}

@keyframes jumper {
  0% {
    top: 85%;
  }
  25% {
    top: 80%;
  }
  50% {
    top: 85%;
  }
  75% {
    top: 90%;
  }
  100% {
    top: 85%;
  }
}

.scroll-down-arrow {
  position: absolute;
  top: 85%;
  left: 50%;
  height: 3em;
  width: 2.625em;
  transform: translate(-50%, 0);
  cursor: pointer;
  animation: jumper 3s linear;
}

.scroll-down-arrow:hover {
  top: 87%;
  transition: all 0.5s linear;
}

.scroll-down-arrow path {
  fill: #fff;
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