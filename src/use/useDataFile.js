import { ref } from 'vue'
import * as cheerio from 'cheerio'
import { useStore } from 'vuex'

export default function useDataFile () {
  const store = useStore()
  const resultArray = ref([])
  const fileName = ref([])
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
              const name = $(this).find('td:nth-child(3)').text().trim()
              const count = $(this)
                .find('td:nth-child(4)')
                .text()
                .replace(/\s/g, '')
                .trim()
              resultArray.value.push({
                fileName: fileName.value[index],
                name,
                id,
                count
              })
              localStorage.setItem(
                'resultArray',
                JSON.stringify(resultArray.value)
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
      resultArray.value = []
      localStorage.removeItem('resultArray')
      localStorage.removeItem('setDateUploadFile')
      let files = [...event.target.files]
      fileName.value = [...files].map(el => el.name)
      console.log(fileName.value)
      store.commit('setDateUploadFile', new Date().toLocaleString())
      await readFileAsync(files)
    } catch (err) {
      console.log(err)
    }
  }
  return {
    processFile,
    resultArray
  }
}
