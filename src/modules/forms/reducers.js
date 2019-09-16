import { handleActions } from "redux-actions";
import { getForms, getFormById } from './actions';
import {clone} from 'ramda';

const initialState = {
    forms: [],
    currentForm: undefined // null - no form, {} - form
};

const forms = handleActions({
        [getForms]: (state, { payload }) => ({
            ...state,
            forms: payload
        }),
        [getFormById]: (state, { payload }) => ({
            ...state,
            currentForm: clone(payload)
        })
    },
    initialState
);

  export default forms;