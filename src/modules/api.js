import axios from 'axios'

const ip = '192.168.43.216' // server ip -v4
const port = 3001 // server port

export default axios.create({
  baseURL: `http://${ip}:${port}/`
});