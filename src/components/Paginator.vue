<template>
  <div class="paginator-container">
    <button
      @click="onClickPrev"
      :disabled="currentPage === 1"
      title="Previous page"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <button
      v-show="totalPages > 5 && !pageArray.includes(0)"
      @click="onClickFirst"
      :class="{ selected: currentPage === 1 }"
    >
      1
    </button>
    <button
      v-show="pageArray[4] > 5 && totalPages > 5"
      @click="onClickPrevFive"
      title="Previous five pages"
    >
      <font-awesome-icon :icon="['fas', 'angle-double-left']" />
    </button>
    <button
      v-for="page in pageArray"
      :key="page"
      :class="{ selected: page + 1 === currentPage }"
      @click="onSelectPage(page + 1)"
    >
      {{ page + 1 }}
    </button>
    <button
      v-show="pageArray[4] <= totalPages - 5 && totalPages > 5"
      @click="onClickNextFive"
      title="Next five pages"
    >
      <font-awesome-icon :icon="['fas', 'angle-double-right']" />
    </button>
    <button
      v-show="totalPages > 6 && !pageArray.includes(totalPages - 1)"
      @click="onClickLast"
      :class="{ selected: currentPage === totalPages }"
    >
      {{ totalPages }}
    </button>
    <button
      @click="onClickNext"
      :disabled="currentPage === totalPages"
      title="Next page"
    >
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
  </div>
</template>

<script>
export default {
  name: "paginator",
  props: {
    pageSize: {
      type: Number,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      base: 0, //base controls the pages listed in paginator
      totalPages: 0,
      pageArray: [],
      // current: this.currentPagePage,
    };
  },
  watch: {
    currentPage: function () {
      if (this.currentPage === 1) this.base = 0;
    },
    base: function () {
      this.createPageArray();
    },
    totalCount: function () {
      this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      this.createPageArray();
    },
  },
  methods: {
    onClickPrev: function () {
      this.onChange(this.currentPage - 1);
      if (!this.pageArray.includes(this.currentPage - 2)) this.base -= 5;
    },
    onClickFirst: function () {
      this.onChange(1);
      this.base = 0;
    },
    onClickPrevFive: function () {
      if (this.currentPage > 6) {
        this.onChange(this.currentPage - 5);
        this.base -= 5;
      } else {
        this.onChange(1);
        this.base = 0;
      }
    },
    onSelectPage: function (page) {
      this.onChange(page);
    },
    onClickNextFive: function () {
      if (this.currentPage + 5 > this.totalPages) {
        this.onChange(this.totalPages);
        this.base = this.totalPages - 5;
      } else {
        this.onChange(this.currentPage + 5);
        this.base += 5;
      }
    },
    onClickLast: function () {
      this.onChange(this.totalPages);
      this.base = this.totalPages - 5;
    },
    onClickNext: function () {
      this.onChange(this.currentPage + 1);
      if (!this.pageArray.includes(this.currentPage)) this.base += 5;
    },
    createPageArray: function () {
      let pageArr = [...new Array(this.totalPages).slice(0, 5).keys()].map(
        (item) => {
          return item + this.base;
        }
      );
      this.pageArray = pageArr;
    },
  },
};
</script>

<style scoped>
.paginator-container {
  margin: 0 auto;
  display: table;
  height: 40px;
  width: auto;
  max-width: 100vw;
}

.paginator-container > button {
  height: 40px;
  width: 40px;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}

.pageButton {
  height: 50px;
  width: 50px;
}

.selected {
  background: #0091ea !important;
  color: #fff;
}

@media screen and (max-width: 480px) {
  .paginator-container > button {
    height: 30px;
    width: 30px;
    font-size: 0.8rem;
  }
}
</style>