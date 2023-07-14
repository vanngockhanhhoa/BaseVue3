import { ADMIN_URIS } from "@/config/api_path"

export default axios => ({
  list(params) {
    return axios.get(ADMIN_URIS.HOTEL, { params: params })
  },
  get(adminId) {
    return axios.get(`${ADMIN_URIS.HOTEL}/${adminId}`)
  },
  create(params) {
    return axios.post(ADMIN_URIS.HOTEL, params)
  },
  update(adminId, params) {
    return axios.put(`${ADMIN_URIS.HOTEL}/${adminId}`, params)
  },
  delete(adminId, params) {
    return axios.delete(`${ADMIN_URIS.HOTEL}/${adminId}`, { params })
  },
})
