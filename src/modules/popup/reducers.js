import { handleActions } from "redux-actions";
import { setMessage, setStatePopup, setStatus } from './actions';

const initialState = {
    isOpenPopup: false,
    message: '',
    isError: false
}

const popup = handleActions({
    [setMessage]: (state, { payload }) => ({
        ...state,
        message: payload
    }),
    [setStatePopup]: (state, { payload }) => ({
        ...state,
        isOpenPopup: payload
    }),
    [setStatus]: (state, { payload }) => ({
        ...state,
        isError: payload
    })
},
initialState
);

export default popup;