import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import {ip_server,port} from '../config'

export default axios.create({
  baseURL: `http://${ip_server}:${port}/`
});