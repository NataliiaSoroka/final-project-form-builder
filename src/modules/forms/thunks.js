import * as actions from "./actions";
import axios from 'axios';

// const baseURL = 'http://forms-app.brutgroot.com/nata_net'
const baseURL = 'http://forms-app.brutgroot.com/shpax'
export const getForms = () => async (dispatch) => {
  const { data } = await axios.get(`${baseURL}/forms/list`);
  dispatch(actions.getForms(data));
};

export const getFormById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseURL}/forms/${id}`);
    dispatch(actions.getFormById(data));
  } catch {
    dispatch(actions.getFormById(null));
  }
}

export const updateForm = (id, payload) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${baseURL}/forms/${id}`, payload);
    return data;
  } catch (err) {
    // TODO: add handling errors and display alert
    console.error(err.response.data)
  }
}

export const createForm = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${baseURL}/forms/new`, payload);
    return data;
  } catch(err) {
    // TODO: add handling errors and display alert
    console.error(err.response.data)
  }
}