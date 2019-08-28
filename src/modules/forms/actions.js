import { createAction } from "redux-actions";

export const getForms = createAction("FORMS::GET");
export const getFormById = createAction("FORM::GET");
export const createForm = createAction("FORM::CREATE");
export const updateForm = createAction("FORM::UPDATE");
