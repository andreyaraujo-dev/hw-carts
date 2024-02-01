import axios from 'axios'

export function createAxiosInstance(apiUrl: string) {
  return axios.create({
    baseURL: apiUrl
  })
}
