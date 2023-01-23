import { createStore, createLogger } from 'vuex'
import Localbase from 'localbase'

const debug = process.env.NODE_ENV !== 'production'
let db = new Localbase('db')

export default createStore({
  plugins: debug ? [createLogger({})] : [],
  state: {
    listItems: [],
    deletedItems: [],
    dateUploadFile: null,
    dateUploadFileDep: null,
    dateUploadFileRepairs: null
  },
  mutations: {
    setListItems (state, data) {
      state.listItems = data
    },
    setListItem (state, item) {
      state.listItems.push(item)
    },
    deleteItem (state, id) {
     state.deletedItems.push(state.listItems.find((el) => el.id === id))
      localStorage.setItem('deletedItems', JSON.stringify(state.deletedItems))
      state.listItems.filter((el) => el.id !== id)
    },
    setDoneItem (state, item) {
      state.listItems.map((el) => el.done === item.done)
    },
    setDateUploadFile (state, date) {
      state.dateUploadFile = date
      localStorage.setItem(
        'setDateUploadFile',
        JSON.stringify(date)
      )
    },
    setDateUploadFileDep (state, date) {
      state.dateUploadFileDep = date
      localStorage.setItem(
        'setDateUploadFileDep',
        JSON.stringify(date)
      )
    },
    setDateUploadFileRepairs (state, date) {
      state.dateUploadFileRepairs = date
      localStorage.setItem(
        'setDateUploadFileRepairs',
        JSON.stringify(date)
      )
    }
  },
  actions: {
    async addItem ({ commit, dispatch }, value) {
      const item = await db.collection('listItems').add({
        id: Date.now(),
        text: value,
        date: new Date().toLocaleString(),
        done: false,
        state: {
          removed: false
        },
        changed: ''
      })
      commit('setListItem', item)
      dispatch('getListItems')
    },
    async updateItem ({dispatch }, { id , text}) {
      await db.collection('listItems').doc({id: id}).update({
        text,
        date: new Date().toLocaleString(),
        changed: true
      })
      dispatch('getListItems')
    },
    async deleteItem ({ commit, dispatch }, id) {
      await db.collection('listItems').doc({ id: id }).delete()
      commit('deleteItem', id)
      dispatch('getListItems')
    },
    async getListItems ({ commit }) {
      const data = await db
        .collection('listItems')
        .get()
        .then((item) => item)
      commit('setListItems', data)
    },
    async toggleDone ({ commit }, item) {
      await db
        .collection('listItems')
        .doc({ id: item.id })
        .update({
          done: item.done === false ? (item.done = true) : (item.done = false)
        })
      commit('setDoneItem', item.done)
    }
  },
  getters: {
    getItems (state) {
      return state.listItems
    },
    geDeletedItems (state) {
      return state.deletedItems
    },
    getDateUploadFile (state) {
      return state.dateUploadFile
    },
    getDateUploadFileDep (state) {
      return state.dateUploadFileDep
    },
    getDateUploadFileRepairs (state) {
      return state.dateUploadFileRepairs
    }
  },
  modules: {}
})
