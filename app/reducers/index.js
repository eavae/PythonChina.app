import {combineReducers} from 'redux'

import timeline from './timeline'
import auth from './auth'
import cafes from './cafes'

export default combineReducers({
    timeline,
    auth,
    cafes
})