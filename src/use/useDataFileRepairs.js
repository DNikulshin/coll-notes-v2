import { ref } from 'vue'
import * as cheerio from 'cheerio'
import { useStore } from 'vuex'

export default function useDataFileRepairs () {
  const store = useStore()
  const resultArrayRepairs = ref([])
  const fileNameRepairs = ref([])
  const readFileAsync = async (files) => {
    return new Promise((resolve, reject) => {
      if (files.length) {
        for (let index = 0; index < files.length; index++) {
          let reader = new FileReader()
          reader.onload = () => {
            const $ = cheerio.load(reader.result.replaceAll('&nbsp;', ' '))
            $('tr').each(function() {
              const item = $(this)
                .find('.table_item')
                .text()
                .replace(/\s/g, '')
                .trim()
              console.log(item)
              // const name = $(this).find('td:nth-child(1)').text().trim()
              resultArrayRepairs.value.push({
                fileName: fileNameRepairs.value[index],
                item
              })
              localStorage.setItem(
                'setDateUploadFileRepairs',
                JSON.stringify(resultArrayRepairs.value)
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
      resultArrayRepairs.value = []
      localStorage.removeItem('resultArrayRepairs')
      localStorage.removeItem('setDateUploadFileRepairs')
      let files = [...event.target.files]
      fileNameRepairs.value = [...files].map(el => el.name)
      store.commit('setDateUploadFileRepairs', new Date().toLocaleString())
      await readFileAsync(files)
    } catch (err) {
      console.log(err)
    }
  }
  return {
    processFile,
    resultArrayRepairs
  }
}
