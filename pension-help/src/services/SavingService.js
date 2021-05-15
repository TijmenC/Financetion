import Axios from '../axios-common';

function getAllSavings () {
  return Axios.httpdefault().get("/saving");
};

const get = async id => {
  return await Axios.get(`/saving/${id}`);
};

const postSaving = async data => {
  return await Axios.post("/saving", data);
};

const update = async (id, data) => {
  return await Axios.put(`/saving/${id}`, data);
};

const remove = async id => {
  return await Axios.delete(`/saving/${id}`);
};

export {
  getAllSavings,
  get,
  postSaving,
  update,
  remove
};