import dayjs from 'dayjs'
import { DATETIME_FORMAT } from '@/config/datetime_format'
import { useCookies } from 'vue3-cookies'
import {USER_INFO_KEY, ACTOR_REDIRECTS} from '@/config/consts'
import truncate from 'truncate-utf8-bytes'
import numeral from 'numeral'

const IMAGE_BASE_URL = process.env.VUE_APP_IMAGE_BASE_URL
const BASE_URL = process.env.VUE_APP_BASE_URL

function getLengthInBytes(str) {
  var b = str.match('/[^\x00-\xff]/g')
  return str.length + (!b ? 0 : b.length)
}
export const formatDate = (date, format) => {
  return date ? dayjs(date).format(format || DATETIME_FORMAT.VIEW_FULL_DATE) : ''
}

export const formatNumber = (val, format) => {
  return val ? numeral(val).format(format || '0,0') : ''
}

export const generateImageUrl = (imagePath) => {
  return IMAGE_BASE_URL + imagePath
}

export const generateUrl = (imagePath) => {
  return BASE_URL + imagePath
}

export const generateParams = (params) => {
  const paramFilters = {}
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key]
      if (value && value.trim() !== '') {
        const fieldFilter = 'filter[' + key + ']'
        paramFilters[fieldFilter] = value
      }
    }
  }
  return paramFilters
}

export const generateOptions = (
  options,
  valueField = 'id',
  labelField = 'name',
) => {
  return options.map((option) => {
    const label = option[labelField]
    const truncatedLabel =
      getLengthInBytes(label) > 80
        ? truncate(option[labelField], 80) + '...'
        : label
    return {
      label: truncatedLabel,
      value: option[valueField],
    }
  })
}

export const generateOptionsWithEmptyOption = (
  options,
  valueField = 'id',
  labelField = 'name',
) => {
  const emptyOption = [
    {
      label: '',
      value: '',
    },
  ]
  return emptyOption.concat(
    options.map((option) => {
      const label = option[labelField]
      const truncatedLabel =
        getLengthInBytes(label) > 80
          ? truncate(option[labelField], 80) + '...'
          : label
      return {
        label: truncatedLabel,
        value: option[valueField],
      }
    }),
  )
}

/**
 * Get key of field and return value map to key
 *
 * @param value
 * @param arrValue
 * @returns {*}
 */
export const getItemLabelInArray = (value, arrValue) => {
  const element = arrValue.find((el) => {
    return el.value + '' == value + ''
  })
  return element ? element.label : null
}

export const getSizeInArray = (value, arrValue) => {
  const element = arrValue.find((el) => {
    return el.id + '' == value + ''
  })
  return element ? element.size : null
}

export const addDateFormat = (
  value,
  day = 1,
  type = 'day',
  format = DATETIME_FORMAT.VIEW_FULL_DATE,
) => {
  if (!value) {
    return ''
  }
  return dayjs(value).add(day, type).format(format)
}

export const convertFullWidthToHalfWidth = (value) => {
  return value.replace(/[\uff01-\uff5e]/g, function (ch) {
    return String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  })
}

export const removeUserCookie = () => {
  const { cookies } = useCookies()
  cookies.remove(USER_INFO_KEY)
}

export const isNullOrUndefined = (value) => {
  return value === null || value === undefined || value === ''
}

export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0
}

export const removeCommas = (value) => {
  if (isNullOrUndefined(value)) {
    return ''
  }
  return value.toString().replace(/,/g, '')
}

export const generateCookieValue = (user) => {
  return (
    user.email +
    ',' +
    user.role +
    ',' +
    user.is_master +
    ';domain=localhost' +
    ';path=/'
  )
}

export const parseCookieValue = (cookieValue) => {
  if (!cookieValue) return null
  const userInfo = cookieValue.split(';')[0]
  return {
    email: userInfo.split(',')[0],
    role: userInfo.split(',')[1],
    is_master: userInfo.split(',')[2],
  }
}

export const isInteger = (value) => {
  if (isNullOrUndefined(value)) {
    return true
  }
  value = removeCommas(value)
  return /^-?[0-9]+$/.test(value)
}

export const getProps = (data, propNames) => {
  const transformedData = {}
  propNames.forEach((prop) => {
    transformedData[prop] = data[prop] || ''
  })
  return transformedData
}

export const getMonthAndYear = (date) => {
  if (!date) {
    return ''
  }
  let dateObj = new Date(date);
  return dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月'
}

export const removeQueryParams = () => {
  let url= document.location.href;
  window.history.replaceState({}, "", url.split("?")[0]);
}

export const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export const getURLRedirectByActor = (actor) => {
  const pathAccess = localStorage.getItem('pathAccess')
  if (pathAccess) {
    return ACTOR_REDIRECTS[pathAccess]
  }
  if (actor) {
    return ACTOR_REDIRECTS[actor]
  }
  return ACTOR_REDIRECTS['common_login']
}
