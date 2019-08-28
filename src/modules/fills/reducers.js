import { handleActions } from 'redux-actions';
import { getFillsByForm } from './actions';

const initialState = {
    fills: {}
}

const fills = handleActions({
    [getFillsByForm]: (state, { payload: {id, data} }) => ({
        fills: {
            ...state.fills,
            [id]: data
        },
    })
},
    initialState
);

export default fills;