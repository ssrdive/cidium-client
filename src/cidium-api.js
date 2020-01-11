import axios from 'axios';
import { getLoggedInUser } from './helpers/authUtils'

const token = getLoggedInUser() != null ? getLoggedInUser().token : null

export default axios.create({
    baseURL: 'http://localhost:4000'
});

export const apiAuth = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        Authorization: `Bearer ${token}`
    }
})