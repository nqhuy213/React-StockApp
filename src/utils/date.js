/**
 * Return a date as a string format
 * @param {string} timestamp 
 */
export const getDateString = (timestamp) => {
  const ts = new Date(timestamp)
  return ts.toLocaleDateString()
}