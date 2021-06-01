import {getTokenWithExpiry} from '../utils/token';
const BASE_URL = 'https://react-stock-api.herokuapp.com';
/**
 *
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {string} params - request parameters
 */
export const callAPI = async (endpoint, method = 'GET', params) => {
  const token = getTokenWithExpiry();
  const options = {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (params) {
    if (method === 'GET') {
      //Put the params into endpoint
      endpoint += '?' + objectToQueryString(params);
    } else {
      //If the method is not GET, put params to request body
      options.body = JSON.stringify(params);
    }
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const result = await res.json();
  return result;
};

/**
 * Turn object into query string
 * @param {object} obj - search parameterd object
 */
function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => (obj[key].trim() !== '' ? key + '=' + obj[key].trim() : ''))
    .join('&');
}
