<template>
  <div class="form-group d-flex justify-content-center align-items-center my-2 w-100">
    <input class="form-control input-shadow p-2" @change="changeFile($event)" type="file" placeholder="загрузить файл"
           accept="image/*"/>
    <input class="form-control mx-2 input-shadow p-2" type="text" placeholder="написать текст"
           v-model="titleUploadFile" @keydown.enter="setUploadFile">
    <button class="btn btn-info" @click="setUploadFile">загрузить</button>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {ref as fbRef, uploadBytes} from 'firebase/storage'
import {storage} from '@/firebase'

// const props = defineProps({
//
//
// })

const uploadFile = ref(null)
const titleUploadFile = ref('')

const changeFile = (e) => {
  uploadFile.value = e.target.files[0]
}

const setUploadFile = async () => {
  if (uploadFile.value === null || titleUploadFile.value === '') return false
  // loading.value = true
  const fileRef = fbRef(storage, `upload/${titleUploadFile.value.trim().replaceAll('/', '-')}.${(uploadFile.value.name).split('.').pop()}`)
  console.log(titleUploadFile.value.trim().replaceAll('/', '-'))
  await uploadBytes(fileRef, uploadFile.value)
  // await getAllFiles()
  titleUploadFile.value = ''
  uploadFile.value = ''
  // loading.value = false
}
</script>

<style scoped>

</style>
