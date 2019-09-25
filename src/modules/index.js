import { combineReducers } from 'redux'
import forms from './forms/reducers'
import fills from './fills/reducers'
import popup from './popup/reducers'

export default combineReducers({
  forms,
  fills,
  popup
})
