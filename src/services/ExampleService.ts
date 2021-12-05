import http from '../http.js'

export default {
  async getExample(page: number) {
    http.get(`example?page=${page}`).then((response: any) => {
      return response
    }).catch((error: any) => {
      console.error(error)
      return error
    })
  },
}
