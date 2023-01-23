<template>
  <Loading v-if="loading" />
  <div v-else class="home">
    <form-input
      v-model="inputValue"
      @addItem="$emit('addItem', (inputValue = ''))"
    ></form-input>
   <div class="nav-panel">

   </div>
    <div v-if="listItems.length" class="count-items d-flex mb-1">
      <button type="button" class="btn btn-primary position-relative btn-sm">
        <i class="bi bi-card-checklist fs-4"></i>
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {{ listItems.length }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
    </div>
    <div v-else class="mt-3 text-danger">Записей нет!</div>
    <list-items />
  </div>
  <!--  <PWAPrompt />-->
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import store from '@/store'
import ListItems from '@/components/ListItems'
import FormInput from '@/components/FormInput'
import Loading from '@/components/Loading'

export default {
  name: 'Home',
  components: {
    Loading,
    FormInput,
    ListItems
    // PWAPrompt
  },
emits: ['addItem', 'save'],
  setup () {
    const loading = ref(false)
    const inputValue = ref('')

    onMounted(async () => {
      loading.value = true
     const test =  await store.dispatch('getListItems')
      console.log(test)
      loading.value = false
    })
    return {
      listItems: computed(() => store.getters.getItems),
      deletedItems: computed(() => store.getters.geDeletedItems) || JSON.parse(localStorage.getItem('deletedItems')),
      loading,
      inputValue
    }
  }
}
</script>

<style></style>
