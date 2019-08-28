import { combineReducers } from 'redux'
import forms from './forms/reducers'
import fills from './fills/reducers'

export default combineReducers({
  forms,
  fills
})
