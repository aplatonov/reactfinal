import { tasksTypes } from './tasksTypesActions'

const initialState = {
    tasks:[
      {id: 1, label: 'Забрать Мишку', description: 'Подробно Забрать Мишку', done: 1, date: '2018.10.11'},
      {id: 2, label: 'Съесть конфетку', description: 'Подробно Съесть конфетку', done: 2},
      {id: 3, label: 'Погладить Светку', done: 3, date: '2018.12.11'},
      {id: 4, label: 'Поднять пингвина', description: 'Подробно Поднять пингвина', done: 1},
      {id: 5, label: 'Посидеть у камина', description: 'Подробно Посидеть у камина', done: 1},
      {id: 6, label: 'Погрызть Тарантино', done: 2},
      {id: 7, label: 'Сделать кислую мину', description: 'Подробно Сделать кислую мину', done: 3},
      {id: 8, label: 'Сварить щавелину', description: 'Подробно Сварить щавелину', done: 1, date: '2017.2.21'}
    ], 
    updatedTask:null,
    activeFilter:'',
    sort:''
}

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
                        t.done = t.done == 3 ? 1 : t.done + 1
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
        case tasksTypes.CHANGE_FILTER:
            state = Object.assign({}, state, {
                tasks:state.tasks, 
                activeFilter:action.activeFilter
            })
            break
        case tasksTypes.CHANGE_SORT:
            state = Object.assign({}, state, {
                tasks:state.tasks,
                sort:action.sort
            })
            break
        default:
            return state
    }

    return state
}

export default reducer