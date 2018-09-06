import { tasksTypes } from './tasksTypesActions'

const initialState = {tasks:[], updatedTask:null}

const reducer = (state = initialState, action) => {
    let { type, payload } = action

    switch (type) {
        case tasksTypes.ADD_TODO:
            state = Object.assign({}, state, {
                tasks:[...state.tasks, payload]
            })
            break
        case tasksTypes.SELECT_TODO:
            state = Object.assign({}, state, {
                updatedTask:state.tasks.find(t => t.id === payload) || null
            })
            break
        case tasksTypes.REMOVE_TODO:
            state = Object.assign({}, state, {
                tasks:state.tasks.filter(t => t.id !== payload)
            })
            break
        case tasksTypes.RESET_TODO:
            state = initialState
            break
        case tasksTypes.TOGGLE_TODO_STATE:
            state = Object.assign({}, state, {
                tasks:state.tasks.map(t => {
                    if (t.id === payload) {
                        t.done = !t.done
                    }
                    return t
                })
            })
            break
        case tasksTypes.UPDATE_TODO:
            state = Object.assign({}, state, {
                tasks:state.tasks.map(t => {
                    if (t.id === payload.id) {
                        return payload
                    }
                    return t
                }),
                updatedTask:null
            })
            break
        default:
            return state
    }

    return state
}

export default reducer