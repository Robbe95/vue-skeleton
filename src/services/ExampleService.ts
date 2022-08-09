import axios from 'axios'
export default {
  async getExample(page: number) {
    axios.get(`example?page=${page}`).then((response: any) => {
      return response
    }).catch((error: any) => {
      console.error(error)
      return error
    })
  },
}
