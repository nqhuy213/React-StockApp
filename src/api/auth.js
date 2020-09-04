import {callAPI} from './base'

//Register user
export const registerUser = body => callAPI('/user/register', 'POST', body)

//Login user
export const loginUser = body => callAPI('/user/login','POST', body)