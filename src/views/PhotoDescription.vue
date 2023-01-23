<template>
  <div class="container mt-5 d-flex flex-column mb-3">
    <form-input-photo-description/>
    <hr class="w-100">
<!--    <strong class="text-danger d-flex justify-content-center align-self-center text-center"-->
<!--            v-if="loading">Загрузка...</strong>-->
    <div class="content d-flex flex-column justify-content-center align-items-center w-100">
<!--      <div class="text-primary">Всего:&nbsp;{{ fileList.length }}</div>-->
      <list-items-photo-description/>
    </div>
  </div>
</template>

<script setup>
// import {ref} from 'vue'
// import Modal from '../components/Modal'
import FormInputPhotoDescription from '@/components/photoDescription/FormInputPhotoDescription'
import ListItemsPhotoDescription from '@/components/photoDescription/ListItemsPhotoDescription'

// const props = defineProps({
//   loading: {
//       type: Boolean,
//       default: false
//   }
// })
</script>

<style>
.img {
  width: 100px;
  height: 100px;
}

.text-white-space {
  white-space: break-spaces;
  word-wrap: break-word;

}

.box-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

</style>
