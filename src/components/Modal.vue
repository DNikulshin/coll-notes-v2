<template>
  <div class="modal show" tabindex="-1" :class="{'d-none'  : isCloseModal}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModalHandler"></button>
        </div>
        <div class="modal-body">
         <img :src="img" :alt="alt"/>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'Modal',
  props: {
    img: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''

    },
    title: {
      type: String,
      default: ''
    },
    // closeModalHandler: {
    //   type: Function
    // },
    // closeModal: {
    //   type: Boolean
    //
    // }
  },
  // emits: ['isCloseModal', 'closeModalHandler'],
   setup () {
    const isCloseModal = ref(false)

    const closeModalHandler = () => {
      isCloseModal.value =  !isCloseModal.value
     }
     return {
       closeModalHandler,
       isCloseModal
     }
   }
}
</script>

<style scoped>

</style>
