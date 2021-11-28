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
  padding: 0 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  outline: none;
  background: #fff;
  border-radius: 4px;
}

.select-option {
  height: 50px;
  width: 300px;
}

@media screen and (max-width: 480px) {
  .select-parent {
    width: 100%;
  }

  .select-option {
    width: 100%;
  }
}
</style>