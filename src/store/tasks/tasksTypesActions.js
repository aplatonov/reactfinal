export const tasksTypes = {
    'ADD_TODO':'ADD_TODO',
    'REMOVE_TODO':'REMOVE_TODO',
    'TOGGLE_TODO_STATE':'TOGGLE_TODO_STATE',
    'UPDATE_TODO':'UPDATE_TODO',
    'SELECT_TODO':'SELECT_TODO',
    'CHANGE_FILTER':'CHANGE_FILTER',
    'CHANGE_SORT':'CHANGE_SORT',
    'RESET_TODO':'RESET_TODO'
}

export const tasksActions = {
    [tasksTypes.ADD_TODO]:(todo) => {
        return { type:tasksTypes.ADD_TODO, payload:todo }
    },
    [tasksTypes.REMOVE_TODO]:(id) => {
        return { type:tasksTypes.REMOVE_TODO, payload:id }
    },
    [tasksTypes.TOGGLE_TODO_STATE]:(id) => {
        return { type:tasksTypes.TOGGLE_TODO_STATE, payload:id }
    },
    [tasksTypes.SELECT_TODO]:(todoId) => {
        return {type:tasksTypes.SELECT_TODO, payload:todoId}
    },
    [tasksTypes.UPDATE_TODO]:(todo) => {
        return { type:tasksTypes.UPDATE_TODO, payload:todo }
    },
    [tasksTypes.CHANGE_FILTER]:(activeFilter) => {
        return { type:tasksTypes.CHANGE_FILTER, activeFilter }
    },
    [tasksTypes.CHANGE_SORT]:(sort) => {
        return { type:tasksTypes.CHANGE_SORT, sort }
    },
    [tasksTypes.RESET_TODO]:() => {
        return { type:tasksTypes.RESET_TODO }
    }
}