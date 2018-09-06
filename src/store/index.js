import { combineReducers, createStore } from 'redux'

import globalReducer from './global/globalReducer'
import tasksReducer from './tasks/tasksReducer'

const reducers = combineReducers({
    global:globalReducer,
    todos:tasksReducer
})

export default createStore(reducers)