import { ADMIN_URIS } from "@/config/api_path"

export default axios => ({
  getCustomerOptions(params = null) {
    return axios.get(ADMIN_URIS.MASTER + '/get-customer-options', { params: params })
  },
  getBusinessPartnerOptions(params = null) {
    return axios.get(ADMIN_URIS.MASTER + '/get-business-partner-options', { params: params })
  },
  getCategoryOptions(params = null) {
    return axios.get(ADMIN_URIS.MASTER + '/get-category-options', { params: params })
  },
  getProductOptions(params = null) {
    return axios.get(ADMIN_URIS.MASTER + '/get-product-options', { params: params })
  },
  getStoreAttributeOptions(params = null) {
    return axios.get(ADMIN_URIS.MASTER + '/get-store-attribute-options', { params: params })
  },
  getCustomerStoreOptions(params = null) {
    return axios.get(ADMIN_URIS.MASTER + '/get-customer-store-options', { params: params })
  },
  getProductsByCustomer(params) {
    return axios.get(ADMIN_URIS.MASTER + '/get-products-by-customer', { params: params})
  },
  getProductsByBusinessPartner(params) {
    return axios.get(ADMIN_URIS.MASTER + '/get-products-by-business-partner', { params: params})
  },
  getListProductModal(params) {
    return axios.get(ADMIN_URIS.MASTER + '/get-products-modal', { params: params })
  },
  getDeliveryDestinationOptions(params) {
    return axios.get(ADMIN_URIS.MASTER + '/get-delivery-destination', { params: params })
  }
})
