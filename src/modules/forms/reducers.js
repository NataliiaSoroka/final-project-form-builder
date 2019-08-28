import { handleActions } from "redux-actions";
import { getForms, getFormByid, createForm, updateForm} from './actions';

const initialState = {
    forms: [],
    currentForm: {}
};

const forms = handleActions({
        [getForms]: (state, { payload }) => ({
            ...state,
            forms: payload
        })
    },
    initialState
);

  export default forms;