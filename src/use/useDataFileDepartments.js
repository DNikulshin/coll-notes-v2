import { ref } from 'vue'
import * as cheerio from 'cheerio'
import { useStore } from 'vuex'

export default function useDataFileDepartments () {
  const store = useStore()
  const resultArrayDep = ref([])
  const fileNameDep = ref([])
  const readFileAsync = async (files) => {
    return new Promise((resolve, reject) => {
      if (files.length) {
        for (let index = 0; index < files.length; index++) {
          let reader = new FileReader()
          reader.onload = () => {
            const $ = cheerio.load(reader.result.replaceAll('&nbsp;', ' '))
            $('tr').each(function() {
              const id = $(this)
                .find('td:nth-child(2)')
                .text()
                .replace(/\s/g, '')
                .trim()
              const name = $(this).find('td:nth-child(1)').text().trim()
              resultArrayDep.value.push({
                fileName: fileNameDep.value[index],
                id,
                name,
              })
              localStorage.setItem(
                'resultArrayDep',
                JSON.stringify(resultArrayDep.value)
              )
            })
          }

          reader.readAsText(files[index])
          reader.onerror = reject
        }
      }
    })
  }
  const processFile = async (event) => {
    try {
      resultArrayDep.value = []
      localStorage.removeItem('resultArrayDep')
      localStorage.removeItem('setDateUploadFileDep')
      let files = [...event.target.files]
      fileNameDep.value = [...files].map(el => el.name)
      console.log(fileNameDep.value)
      store.commit('setDateUploadFileDep', new Date().toLocaleString())
      await readFileAsync(files)
    } catch (err) {
      console.log(err)
    }
  }
  return {
    processFile,
    resultArrayDep
  }
}
