<template>
  <article class="post-card-container">
    <header class="post-header">
      <h4
        class="post-category"
        v-for="category in postCategories"
        :key="category"
      >
        {{ category }}
      </h4>
    </header>

    <div class="post-thumbnail">
      <img :src="data.post_thumbnail.URL" alt="" />
    </div>
    <div class="post-content">
      <h1>
        {{ data.title }}
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
  data() {
    return {
      postCategories: [],
    };
  },
  computed: {
    renderPostDate: function () {
      let secondsDiff = moment().diff(moment(this.data.date), "seconds");
      let minutesDiff = moment().diff(moment(this.data.date), "minutes");
      let hoursDiff = moment().diff(moment(this.data.date), "hours");
      let dayDiff = moment().diff(moment(this.data.date), "days");
      let monthDiff = moment().diff(moment(this.data.date), "months");
      let yearsDiff = moment().diff(moment(this.data.date), "years");

      let dateString = "";
      if (secondsDiff < 60) {
        dateString = `${secondsDiff} ${
          secondsDiff > 1 ? "seconds" : "second"
        } ago`;
      } else if (minutesDiff < 60) {
        dateString = `${minutesDiff} ${
          minutesDiff > 1 ? "minutes" : "minute"
        } ago`;
      } else if (hoursDiff < 24) {
        dateString = `${hoursDiff} ${hoursDiff > 1 ? "hours" : "hour"} ago`;
      } else if (dayDiff < 30) {
        dateString = `${dayDiff} ${dayDiff > 1 ? "days" : "day"} ago`;
      } else if (monthDiff < 12) {
        dateString = `${monthDiff} ${monthDiff > 1 ? "months" : "month"} ago`;
      } else {
        dateString = `${yearsDiff} ${yearsDiff > 1 ? "years" : "year"} ago`;
      }
      return dateString;
    },
  },
  methods: {
    getCategories: function () {
      let categories = Object.values(this.data.categories);
      this.postCategories = categories.map((item) => {
        return item.name;
      });
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
</style>