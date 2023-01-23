<template>
  <div v-for="(item, idx) in fileList" :key="item.id" class="w-100 d-flex">
    <ul class="list-group w-100">
      <list-item-photo-description :item="item" :item-idx="idx + 1" @deleteFile="deleteFile(item.id)"/>
    </ul>
  </div>
  <!--    <Modal :img="item?.url"-->
  <!--           :alt="item.name"-->
  <!--           :title="item.name.split('.').slice(0, -1).join('')"-->
  <!--           :class="{'d-block': openModal}"-->
  <!--           @click="$emit('closeModalHandler', modalHandler)"-->
  <!--    />-->
</template>

<script setup>
import {deleteObject, getDownloadURL, listAll, ref as fbRef} from 'firebase/storage'
import {storage} from '@/firebase'
import {onMounted, ref, provide} from 'vue'
import ListItemPhotoDescription from '@/components/photoDescription/ListItemPhotoDescription'

    const fileList = ref([])
    const loading = ref(false)
    const fileListFbRef = fbRef(storage, 'upload/')



    provide('fileList',fileList)

    onMounted(async () => {
      await getAllFiles()
    })

    const getAllFiles = async () => {
      try {
        loading.value = true
        await listAll(fileListFbRef).then((res) => {
          fileList.value = []
          res.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              fileList.value.unshift({
                url,
                name: item.name.trim().replaceAll('-', '/'),
                id: Date.now(),
                date: new Date().toLocaleString()
              })
            })
          })
        })
        loading.value = false
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
}
</script>

<style scoped>

</style>
