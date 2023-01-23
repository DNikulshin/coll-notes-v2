<template>
  <form>
    <div class="input-group mb-3">
      <button
        id="basic-addon1"
        class="input-group-text btn btn-primary"
        type="submit"
        @click.prevent="addItem"
      >
        <i class="bi bi-file-earmark-plus-fill add-item"></i>
      </button>
      <input
        :value="modelValue"
        @input="updateValue"
        type="text"
        class="form-control input-shadow"
        placeholder="Введите запись..."
        aria-describedby="basic-addon1"
        v-focus
      />
    </div>
  </form>
</template>

<script>
import store from "@/store";

export default {
  name: "FormInput",
  props: {
    modelValue: String,
  },
  emits: ["addItem", "update:modelValue"],
  setup(props, { emit }) {
    const updateValue = (e) => {
      emit("update:modelValue", e.target.value);
    };
    const addItem = async (value) => {
      if (props.modelValue) {
        await store.dispatch("addItem", props.modelValue);
        emit("addItem", value);
      }
    };
    return {
      updateValue,
      addItem,
    };
  },
};
</script>

<style scoped>
.add-item {
  font-size: 1.5rem !important;
}
</style>
