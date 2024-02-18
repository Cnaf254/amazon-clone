import axios from 'axios'
const axiosInstance=axios.create({
    // baseURL:"http://127.0.0.1:5001/clone-8d1be/us-central1/api"
    baseURL:"https://amazon-api-deploy-s7bn.onrender.com/"
})

export {axiosInstance}