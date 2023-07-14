// Path router for admins
const ADMIN_SCHEMA = '/admins'
export const ADMIN_URIS = {
  AUTH: ADMIN_SCHEMA + '/auth',
  ADMINS: ADMIN_SCHEMA + '/admins',
  MASTER: ADMIN_SCHEMA + '/master', // get data master for select > option
  DASHBOARD: ADMIN_SCHEMA + '/dashboards',
  ACCOUNT: ADMIN_SCHEMA + '/accounts',
  HOTEL: ADMIN_SCHEMA + '/hotels',
  TRANSMISSION: ADMIN_SCHEMA + '/transmission-logs',
}

// Path router for cleaning factory
export const GENERAL_URIS = {
  AUTH: '/auth',
}
