import * as actions from "./actions";
import axios from 'axios';

const baseURL = 'http://forms-app.brutgroot.com/shpax'

export const getFillsByForm = (id) => async (dispatch) => {
    const { data } = await axios.get(`${baseURL}/fills/${id}`);
    dispatch(actions.getFillsByForm({id, data}));
}