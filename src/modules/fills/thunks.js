import * as actions from "./actions";
import { setStatePopup, setMessage, setStatus } from '../shared/actions';
import axios from 'axios';

const baseURL = 'http://forms-app.brutgroot.com/shpax'

export const getFillsByForm = (id, page, itemsOnPAge) => async (dispatch) => {
    const offset = page * itemsOnPAge;
    const { data } = await axios.get(`${baseURL}/fills/${id}?offset=${offset}&count=${itemsOnPAge}`);
    dispatch(actions.getFillsByForm({id, data}));
}

export const setfillToForm = (id, payload) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${baseURL}/fills/${id}`, payload);
        dispatch(setStatePopup(true))
        dispatch(setMessage('The form was saved successfully'))
        dispatch(setStatus(false))
        return data;
    } catch (err) {
        dispatch(setStatePopup(true))
        dispatch(setMessage('The form was not saved'))
        dispatch(setStatus(true))
    }
}