import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import server from "../../configs/server";

export const getServerAddress = async () => {
  try {
    const value = await AsyncStorage.getItem('@server_address')
    if(value !== null) {
      return value;
    }
  }
  catch(e) {
    console.log(e);
  }
  return "http://" + server.ip + ":" + server.port;
}

export const setServerAddress = async (address) => {
  try {
    await AsyncStorage.setItem('@server_address', address)
  }
  catch(e) {
    console.log(e);
  }
}


const instance = axios.create();

instance.interceptors.request.use(async (config) => {
  config.baseURL = await getServerAddress();
  return config;
});

export default instance;
