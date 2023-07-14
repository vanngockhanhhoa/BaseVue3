import i18n from '@/i18n'

export const TOAST_CONFIG = {
  goAwayTime: 5000,
}

export const CONFIRM_MODAL_TYPE = {
  SUCCESS: 'success',
  WARNING: 'warning',
}

export const ACCOUNT_STATUS = {
  VALID: '1',
  INVALID: '0',
}

export const ACTOR_REDIRECTS = {
  admin: '/admin/login',
  clean: '/clean/login',
  customer: '/customer/login',
  common_login: '/login',
}

/**
 * Config the ratio of the column
 *
 * @type {{grids: {lg: number, xs: number}}}
 */
export const COLUMN_CONFIG = {
  grids: {
    label: 3,
    input: 9,
    lg: 3,
    md: 8,
    xs: 12,
  },
}

export const DATETIME_FORMAT = 'YYYY/MM/DD HH:mm'
export const DATETIME_WITH_SECOND_FORMAT = 'YYYY/MM/DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY/MM/DD'
export const DATE_PICKER_FORMAT = 'YYYY/MM/DD'
export const MONTH_DATE_PICKER = 'YYYY/MM'

//Amount of tax rate = 10%
export const TAX_RATE = 0.1

export const PAGINATION_OPTIONS = [
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 50,
    value: 50,
  },
  {
    label: 100,
    value: 100,
  },
]

export const STATUS_TYPES = [
  { label: '', value: '' },
]

export const IS_MASTER_USER = 1
export const USER_INFO_KEY = 'webbedsUser'
export const ACCESS_TOKEN_KEY = 'webbedsAccessToken'
export const TOKEN_EXPIRED = 'expired_token'
export const EXPIRED_TIME_SESSION = 'expired_time_session'

export const DEFAULT_PAGE = 50

export const PROCESSES = {
  FROM_TLL: 'from_tll',
  FROM_RS: 'from_rs',
}

export const PROCESS_OPTIONS = [
  { label: '', value: '' },
  {
    label: i18n.t('transmission.process_options.from_tll'),
    value: PROCESSES.FROM_TLL,
  },
  {
    label: i18n.t('transmission.process_options.from_rs'),
    value: PROCESSES.FROM_RS,
  },
]

export const ENDPOINTS = {
  UPDATE_RATE: 'update_rate',
  PLAN_MASTER: 'plan_master',
}

export const ENDPOINT_OPTIONS = [
  { label: '', value: '' },
  {
    label: i18n.t('transmission.endpoint_options.update_rate'),
    value: ENDPOINTS.UPDATE_RATE,
  },
  {
    label: i18n.t('transmission.endpoint_options.plan_master'),
    value: ENDPOINTS.PLAN_MASTER,
  },
]

export const STATUS = {
  NOT_DONE: 'not_done',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ERROR: 'error',
}

export const STATUS_OPTIONS = [
  {
    label: i18n.t('transmission.status_options.not_done'),
    value: STATUS.NOT_DONE,
  },
  {
    label: i18n.t('transmission.status_options.in_progress'),
    value: STATUS.IN_PROGRESS,
  },
  {
    label: i18n.t('transmission.status_options.completed'),
    value: STATUS.COMPLETED,
  },
  {
    label: i18n.t('transmission.status_options.error'),
    value: STATUS.ERROR,
  },
]

export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
}

export const METHOD_OPTIONS = [
  {
    label: i18n.t('transmission.method_options.get'),
    value: METHODS.GET,
  },
  {
    label: i18n.t('transmission.method_options.post'),
    value: METHODS.POST,
  },
  {
    label: i18n.t('transmission.method_options.put'),
    value: METHODS.PUT,
  },
  {
    label: i18n.t('transmission.method_options.delete'),
    value: METHODS.DELETE,
  },
  {
    label: i18n.t('transmission.method_options.patch'),
    value: METHODS.PATCH,
  },
]
