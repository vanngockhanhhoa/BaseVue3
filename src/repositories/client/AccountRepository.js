import { ADMIN_URIS } from "@/config/api_path"

export default axios => ({
  list(params) {
    return axios.get(ADMIN_URIS.ACCOUNT, { params: params })
  },
  get(adminId) {
    return axios.get(`${ADMIN_URIS.ACCOUNT}/${adminId}`)
  },
  create(params) {
    return axios.post(ADMIN_URIS.ACCOUNT, params)
  },
  update(adminId, params) {
    return axios.put(`${ADMIN_URIS.ACCOUNT}/${adminId}`, params)
  },
  delete(adminId, params) {
    return axios.delete(`${ADMIN_URIS.ACCOUNT}/${adminId}`, { params })
  },
})
