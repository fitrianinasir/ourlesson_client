export const CLIENT_SECRET = 'rUMHAjfurIXykaVsSajbg3gSDZofKlS4vwyEMacq'

export const CLIENT_ID = 2

export const HEADERS = {
  'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
  'Content-Type' : 'application/json'
}