import { stringify } from 'qs'

export const paramsSerializer = (params) => {
  return stringify(params, { arrayFormat: 'brackets' })
}
