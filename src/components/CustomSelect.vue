<template>
  <div class="select-parent">
    <select :name="selectName" :id="selectName" @change.prevent="onChange">
      <option
        v-for="option in selectOptions"
        :key="option.ID"
        :value="option.slug"
      >
        {{ option.name }}
      </option>
    </select>
    <font-awesome-icon
      :icon="['fas', 'chevron-down']"
      class="select-down-arrow"
    />
  </div>
</template>

<script>
export default {
  name: "custom-select",
  props: {
    selectName: {
      type: String,
      required: true,
    },
    selectOptions: {
      type: Array,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.select-parent {
  position: relative;
  height: 60px;
  width: 350px;
}
.select-parent select {
  height: 100%;
  width: 100%;
  padding: 0 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  outline: none;
  background: #fff;
  border-radius: 4px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.select-parent .select-down-arrow {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
}

@media screen and (max-width: 480px) {
  .select-parent {
    width: 100%;
  }
}
</style>