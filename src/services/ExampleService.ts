import axios from 'axios'
export default {
  async getExample(page: number): Promise<any> {
    axios.get(`example?page=${page}`).then((response: any) => {
      return response
    }).catch((error: any) => {
      console.error(error)
      return error
    })
  },
}
