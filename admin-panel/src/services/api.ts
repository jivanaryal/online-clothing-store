import axios from "axios";

const API_BASE_URL = "http://localhost:50001/api/ocs";
type DataType = unknown;

export const get = (url: string, params: string) => {
  return axios.get(API_BASE_URL + url, { params });
};

export const post = (url: string, data: DataType) => {
  return axios.post(API_BASE_URL + url, data);
};

export const getSingle = (url: string) => {
  return axios.get(API_BASE_URL + url);
};

export const remove = (url: string) => {
  try {
    return axios.delete(API_BASE_URL + url);
  } catch (error) {
    console.log(error);
  }
};

export const update = (url: string, data: DataType) => {
  return axios.patch(API_BASE_URL + url, data);
};