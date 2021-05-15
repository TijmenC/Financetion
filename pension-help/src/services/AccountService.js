import Axios from '../axios-common';

const getAll = async () => {
  return await Axios.get("/accounts");
};

const get = async id => {
  return await Axios.get(`/accounts/${id}`);
};

const create = async data => {
  return await Axios.post("/accounts", data);
};

const update = async (id, data) => {
  return await Axios.put(`/accounts/${id}`, data);
};

const remove = async id => {
  return await Axios.delete(`/accounts/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  headers: {
    "Content-type": "application/json"
  }
};