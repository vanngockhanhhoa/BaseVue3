import { ADMIN_URIS } from "@/config/api_path"

export default axios => ({
  list(params) {
    return axios.get(ADMIN_URIS.TRANSMISSION, { params: params })
  },
})
