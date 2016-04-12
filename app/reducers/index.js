import {combineReducers} from 'redux'

import timeline from './timeline'
import auth from './auth'

export default combineReducers({
    timeline,
    auth
})