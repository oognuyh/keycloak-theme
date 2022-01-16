export const ERROR = 'error'
export const SUCCESS = 'success'
export const WARNING = 'warning'
export const INFO = 'info'

export const getStatus = (status: 'error' | 'success' | 'warning' | 'info' | undefined) => {
  return status || INFO
}
