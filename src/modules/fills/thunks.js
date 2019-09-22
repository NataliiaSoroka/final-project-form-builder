import * as actions from "./actions";
import axios from 'axios';

const baseURL = 'http://forms-app.brutgroot.com/shpax'

export const getFillsByForm = (id, page, itemsOnPAge) => async (dispatch) => {
    const offset = page * itemsOnPAge;
    const { data } = await axios.get(`${baseURL}/fills/${id}?offset=${offset}&count=${itemsOnPAge}`);
    dispatch(actions.getFillsByForm({id, data}));
}

export const setfillToForm = (id, payload) => async (dispatch) => {
    const { data } = await axios.post(`${baseURL}/fills/${id}`, payload);
    data && alert('save fill');
    return data;
}