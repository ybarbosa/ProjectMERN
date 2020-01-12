import Axios from 'axios'

const http = Axios.create({
    baseURL: 'http://www.localhost:9001/',
    timeout: 13000,
    headers: {'content-type' : 'application/json' } 

})


export default http