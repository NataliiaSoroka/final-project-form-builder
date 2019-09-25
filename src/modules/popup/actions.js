import { createAction } from "redux-actions";

export const setMessage = createAction("MESSAGE::SET");
export const setStatePopup = createAction("POPUPSTATE::SET");
export const setStatus = createAction("STATUS::SET");