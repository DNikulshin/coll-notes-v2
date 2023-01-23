<template>
  <div class="about">
    <div class="d-flex justify-content-center align-items-center">
      <div class="date" v-if="date">
        <small class="text-wrap me-2">{{ date }}</small>
      </div>
      <span class="me-3"><i class="bi bi-cloud-arrow-up fs-2"></i></span>
      <input type="file" @change="processFile($event)" multiple accept=".htm" />
    </div>
    <div class="content" v-if="resultArrayDep.length">
      <div class="search m-3">
        <input
          type="search"
          class="form-control searchPos p-2 fs-4 input-shadow"
          placeholder=" Поиск..."
          aria-label="Search"
          v-model="search"
          v-focus
        />
      </div>
      <div class="mb-3">
        <strong>Всего записей:&nbsp;</strong>
        <span class="text-success">{{ searchItems.length }}</span>
      </div>
      <table v-if="searchItems.length" class="table table-bordered table-hover">
        <thead>
        <tr class="text-center">
          <th scope="col">№</th>
          <th scope="col">Файл</th>
          <th scope="col">Название</th>
          <th scope="col">Код</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(item, idx) in searchItems"
          :key="item"
          :class="{ mark: mark }"
        >
          <th scope="row" class="text-center">{{ idx + 1 }}</th>
          <td class="text-nowrap" v-if="item.fileName">{{item.fileName.split('.')[0] }}</td>
          <td class="text-wrap text-wr">{{ item.name }}</td>
          <td class="text-primary">{{ item.id }}</td>
        </tr>
        </tbody>
      </table>
      <div class="m-3 p-3 text-danger text-center" v-show="!searchItems.length">
        <hr class="hr-height" />
        <strong>Нет результатов поиска</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import useDataFileDep from '@/use/useDataFileDepartments'

export default {
  name: 'Departments',
  setup () {
    const store = useStore()
    const search = ref('')
    const mark = ref(false)
    const { processFile, resultArrayDep } = useDataFileDep()
    onMounted(() => {
      if (localStorage.getItem('resultArrayDep')) {
        try {
          resultArrayDep.value = JSON.parse(localStorage.getItem('resultArrayDep'))
        } catch (e) {
          console.log(e)
        }
      }
    })
    const searchItems = computed(() => {
      if (!search.value) {
        return resultArrayDep.value
      }
      return resultArrayDep.value.filter((item) => {
        if (
          item.name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1
        ) {
          return item
        }
      })
    })
    return {
      processFile,
      searchItems,
      search,
      resultArrayDep,
      mark,
      date: computed(() => store.getters.getDateUploadFileDep ||   JSON.parse(localStorage.getItem('setDateUploadFileDep')))
    }
  }
}
</script>

<style>
.text-wr {
  white-space: break-spaces !important;
  word-break: break-word !important;
}

.mark {
  background: darkgreen !important;
}
</style>
