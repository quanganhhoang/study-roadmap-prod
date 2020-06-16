import axios from 'axios'

// const BASE_URL = 
const BASE_URL = process.env.NODE_ENV === 'production' ? 
        'https://studyroadmap.herokuapp.com/' : 
        'http://localhost:8000/'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default axios.create({
    baseURL: BASE_URL,
})

