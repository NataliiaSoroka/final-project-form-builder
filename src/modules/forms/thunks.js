import * as actions from "./actions";
import { setStatePopup, setMessage, setStatus } from '../popup/actions';
import { push } from 'connected-react-router'
import axios from 'axios';

const baseURL = 'http://forms-app.brutgroot.com/nata_net'

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
    dispatch(setStatePopup(true))
    dispatch(setMessage('This form was not found. Should be created it first!'))
    dispatch(setStatus(true))
  }
}

export const updateForm = (id, payload) => async (dispatch) => {
  try {
    await axios.put(`${baseURL}/forms/${id}`, payload);
    dispatch(setStatePopup(true))
    dispatch(setMessage('The form was saved successfully'))
    dispatch(setStatus(false))
    dispatch(push('/'))
  } catch (err) {
    dispatch(setStatePopup(true))
    dispatch(setMessage('The form was not saved'))
    dispatch(setStatus(true))
  }
}

export const createForm = (payload) => async (dispatch) => {
  try {
    await axios.post(`${baseURL}/forms/new`, payload);
    dispatch(setStatePopup(true))
    dispatch(setMessage('The form was created successfully'))
    dispatch(setStatus(false))
    dispatch(push('/'))
  } catch(err) {
    dispatch(setStatePopup(true))
    dispatch(setMessage('The form was not created'))
    dispatch(setStatus(true))
  }
}