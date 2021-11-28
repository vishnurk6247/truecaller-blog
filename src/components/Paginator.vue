<template>
  <div class="paginator-container">
    <button
      @click="
        () => {
          onChange((currentPage -= 1));
          if (!pagesInView.includes(currentPage - 1)) this.base -= 5;
        }
      "
      :disabled="currentPage === 1"
      title="Previous page"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <button
      v-show="totalPages > 5 && !pagesInView.includes(0)"
      @click="
        () => {
          onChange(1);
          this.base = 0;
        }
      "
      :class="{ selected: currentPage === 1 }"
    >
      1
    </button>
    <button
      v-show="pagesInView[4] > 5 && totalPages > 5"
      @click="
        () => {
          if (currentPage > 6) {
            onChange(currentPage - 5);
            this.base -= 5;
          } else {
            onChange(1);
            this.base = 0;
          }
        }
      "
      title="Previous five pages"
    >
      <font-awesome-icon :icon="['fas', 'angle-double-left']" />
    </button>
    <button
      v-for="page in pagesInView"
      :key="page"
      :class="{ selected: page + 1 === currentPage }"
      @click="() => onChange(page + 1)"
    >
      {{ page + 1 }}
    </button>
    <button
      v-show="pagesInView[4] <= totalPages - 5 && totalPages > 5"
      @click="
        () => {
          if (currentPage + 5 > totalPages) {
            onChange(totalPages);
            this.base = totalPages - 5;
          } else {
            onChange(currentPage + 5);
            this.base += 5;
          }
        }
      "
      title="Next five pages"
    >
      <font-awesome-icon :icon="['fas', 'angle-double-right']" />
    </button>
    <button
      v-show="totalPages > 6 && !pagesInView.includes(totalPages - 1)"
      @click="
        () => {
          onChange(totalPages);
          this.base = totalPages - 5;
        }
      "
      :class="{ selected: currentPage === totalPages }"
    >
      {{ totalPages }}
    </button>
    <button
      @click="
        () => {
          onChange((currentPage += 1));
          if (!pagesInView.includes(currentPage - 1)) this.base += 5;
        }
      "
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
  data() {
    return {
      base: 0, //base controls the pages listed in paginator
    };
  },
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
  watch: {
    currentPage: function () {
      if (this.currentPage === 1) this.base = 0;
    },
  },
  computed: {
    totalPages: function () {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    pagesInView: function () {
      let pageArr = [...new Array(this.totalPages).slice(0, 5).keys()].map(
        (item) => {
          return item + this.base;
        }
      );
      return pageArr;
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