import axios from 'axios';
import { url } from '../config/baseUrl';


export const registerUser = async(data) => {
    var config = {
        method: "post",
        url: `${url}/users/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      };
    
      try {
        const res = await axios(config);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

export const loginUser = async(data) => {
    var config = {
        method: "post",
        url: `${url}/users/login`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data,
      };
    
      try {
        const res = await axios(config);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

export const dashboard = async() => {
    var config = {
        method: "get",
        url: `${url}/dashboard`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
    
      try {
        const res = await axios(config);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

export const getAllTask = async() => {
    var config = {
        method: "get",
        url: `${url}/tasks`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
    
      try {
        const res = await axios(config);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

export const createTask = async(data) => {
    var config = {
        method: "post",
        url: `${url}/tasks`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data
      };
    
      try {
        const res = await axios(config);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

export const updateTask = async(data,id) => {
    var config = {
        method: "put",
        url: `${url}/tasks/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data
      };
    
      try {
        const res = await axios(config);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}

export const deleteTask = async(id) => {
    var config = {
        method: "delete",
        url: `${url}/tasks/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
    
      try {
        const res = await axios(config);
        return res;
      } catch (err) {
        console.log(err);
        return err;
      }
}