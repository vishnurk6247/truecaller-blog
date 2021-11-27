<template>
  <select
    :name="selectName"
    :id="selectName"
    class="select-parent"
    @change.prevent="onChange"
  >
    <option
      v-for="option in selectOptions"
      :key="option.ID"
      :value="option.slug"
      class="select-option"
    >
      {{ option.name }}
    </option>
  </select>
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
  height: 50px;
  width: 350px;
}

.select-option {
  height: 50px;
  width: 300px;
}
</style>