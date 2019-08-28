import * as actions from "./actions";
import axios from 'axios';

const baseURL = 'http://forms-app.brutgroot.com/shpax'

export const getForms = () => async (dispatch) => {
    const { data } = await axios.get(`${baseURL}/forms/list`);
    dispatch(actions.getForms(data));
  }; 