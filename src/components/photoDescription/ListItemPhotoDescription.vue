<template>
  <li class="list-group-item my-2 d-flex justify-content-center align-items-center w-100 p-3 box-shadow">
    <strong class="text-white-space margin-0-auto">
      <span>#{{ itemIdx}}</span>
      {{ item?.name?.split('.').slice(0, -1).join('') }}
    </strong>
    <!--                        <small class="mx-3 d-flex flex-nowrap justify-content-center align-items-center text-nowrap">-->
    <!--                          <i class="bi bi-clock-history "></i>&nbsp;{{ item.date }}-->
    <!--                        </small>-->
    <div class="img-group d-flex">
      <img :src="item?.url" :alt="item?.name" class="img pointer" @click="openModal=true"/>
      <button class="btn btn-outline-danger btn-sm fs-4 mx-3 me-0 pointer text-danger hover-x align-self-center" @click="$emit('deleteFile')">x</button>
    </div>
  </li>
</template>

<script setup>
import {deleteObject, ref as fbRef} from 'firebase/storage'
import {storage} from '@/firebase'

const props = defineProps({
  item: {
    type: Object,
    name: {
      type: String,
    },
    url: {
      type: String
    },
    id: Number
  },
  itemIdx: Number

})
const emit = defineEmits(['deleteFile'])


const deleteFile = (id) => {
  const fileName = fileList.value.find(item => item.id === id)
  const desertRef = fbRef(storage, `upload/${fileName.name}`)
  const confirmMessage = confirm('удалить?')
  if(confirmMessage) {
    deleteObject(desertRef).then(() => {
      getAllFiles()
    }).catch((e) => {
      console.log(e)
    })
  }
}
</script>

<style scoped>

</style>
