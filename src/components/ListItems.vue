<template>
  <transition-group
    v-if="listItems.length"
    name="list-items"
    tag="ul"
    class="list-group"
  >
    <li
      class="list-group-item list-item"
      v-for="(item, idx) in listItems"
      :key="item.id"
      :class="{ done: item.done }"
    >
      <div
        class="d-flex justify-content-between justify-content-center align-items-center"
      >
        <span class="me-4">#&nbsp;{{ idx + 1 }}</span>
        <div class="text-primary item-text me-2 p-2 text-hover"  @blur="updateItem(item.id, updateText($event))" contenteditable="true" @click.stop>
          {{ item.text ? item.text : 'пустое поле'}}
        </div>
        <div
          class="d-flex justify-content-between align-items-center justify-content-center"
        >
          <small class="me-3">
            <i class="bi bi-clock-history"></i>&nbsp;{{ item.date }}
          </small>
        </div>
        <div class="text-info me-3 check-hover" @click="toggleDone(item)">
          <i v-if="!item.done" class="bi bi-check2 text-danger"></i>
          <i v-else class="bi bi-check2-all"></i>
        </div>
        <div class="text-danger fs-4 cart" @click="deleteItem(item.id)">
          <i class="bi bi-trash"></i>
        </div>
      </div>
    </li>
  </transition-group>
</template>

<script>
import { computed } from "vue";
import store from "@/store";

export default {
  name: "ListItems",
  setup() {
    const updateText = (event) => {
      if(event.target.innerText.trim()) {
        return  event.target.innerText.trim()
      }
    }

    return {
      listItems: computed(() => [...store.getters.getItems]),
      toggleDone: async (item) => await store.dispatch("toggleDone", item),
      deleteItem: async (id) => await store.dispatch("deleteItem", id),
      updateItem: async (id,text) => await store.dispatch("updateItem", { id, text } ),
      updateText
      // markAsDeletedItem: async (item) => await store.dispatch("markAsDeletedItem", item),
    };
  },
};
</script>

<style>
.list-items-enter-active,
.list-items-leave-active {
  transition: all 0.3s ease;
}

.list-items-enter-from,
.list-items-leave-to {
  opacity: 0;
  transform: translate3d(42px, -62px, -135px) !important;
  transition: all 0.3s ease;
}

.list-items-move {
  transform: translate3d(42px, -62px, -135px) !important;
  transition: transform 0.3s ease;
}

.check-hover:hover {
  text-shadow: 0 2px 4px brown !important;
  transition: 0.3s;
}

.removed {
  background: rgba(220, 21, 21, 1) !important;
}

.list-item {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0.5rem;
}

.cart:hover {
  font-size: 3rem;
  text-shadow: 0 2px 4px red;
  cursor: pointer;
  transition: 0.3s;
}

.item-text {
  white-space: break-spaces !important;
  word-break: break-word !important;
}

.done {
  background: rgba(146, 242, 146, 0.65) !important;
  transition: 0.3s;
}
.text-hover:hover {
  box-shadow: 0 0 1px 1px green;
}
</style>
