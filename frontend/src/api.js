import axios from 'axios'

const BASE_URL = 'https://studyroadmap.herokuapp.com/'
// const BASE_URL = 'http://localhost:8000/'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default axios.create({
    baseURL: BASE_URL,
})

