import axios from 'axios';
import { getLoggedInUser } from './helpers/authUtils'

const token = getLoggedInUser() != null ? getLoggedInUser().token : null
let baseURL
if(process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:4000'
  }
  
  if(process.env.NODE_ENV === 'production') {
    baseURL = 'https://agrivest.app/api'
  }

export default axios.create({
    baseURL
});

export const apiAuth = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})