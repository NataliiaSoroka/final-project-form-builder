import { combineReducers } from 'redux'
import forms from './forms/reducers'
import fills from './fills/reducers'
import shared from './shared/reducers'

export default combineReducers({
  forms,
  fills,
  shared
})
