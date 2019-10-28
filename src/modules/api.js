import axios from 'axios'
import join from 'url-join'
import * as SecureStore from 'expo-secure-store';
import {ip_server,port, server_url} from '../config'

axios.interceptors.request.use(async (config)=> {
  const jwtToken = await SecureStore.getItemAsync("tokenAuth")
  if (jwtToken != null) {
      config.headers = { 'Authorization': `Bearer ${jwtToken}` }
  }
  config.url = join(server_url, config.url);
  return config;
  
});
export default axios

