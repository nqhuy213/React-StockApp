/**
 * Store token got from server in localStorage with expiry
 * @param {string} token - Token returned from server
 * @param {string} ttl - Time to live
 */
export const setTokenWithExpiry = (token, ttl) => {
  const now = new Date()
  const expireIn =  ttl * 1000 //expire time in millisecond
  const item = {
    value: token,
    expiry: now.getTime() + expireIn
  }
  localStorage.setItem('token', JSON.stringify(item))
}

/**
 * Check if token exist in localStorage
 */
export const getTokenWithExpiry = () => {
  const itemStr = localStorage.getItem('token')
  // if the item doesn't exist, return null
  if (!itemStr) {
    return ''
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem('token')
    return ''
  }
  return item.value
}

export const deleteToken = () => {
  localStorage.removeItem('token')
}