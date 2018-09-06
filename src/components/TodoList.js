import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { tasksTypes, tasksActions } from '../store/tasks/tasksTypesActions'

const Todo = ({label, done, onRemove, id, onToggle, onSelect}) => {
    let className = done ? 'done' : null
    return (
        <div className='todo'> 
            <span className={className}>{label}</span> 
            <span className='todo-actions'>
                <button onClick={ () => onToggle(id) }>{done ? 'Не готово' : 'Готово'}</button>
                <button onClick={ () => onSelect(id) }>Редактировать</button> 
                <button onClick={ () => onRemove(id) }>&times;</button>
            </span>        
        </div>
    )
}

const parseSearchPath = path => {
    const parts = path.replace('?','').split('=')
    return {
        [parts[0]]:parts[1]
    }
}

class TodoList extends Component {

    state = {
        filter:'all'
    }

    changeLocation = (e) => {
        
        this.setState({
            filter:this.filterInput.value
        }, () => {
            switch (this.state.filter) {
                case 'all':
                    this.props.history.push('/todos')
                    break
                case 'done':
                    this.props.history.push('/todos?filter=done')
                    break
                case 'undone':
                    this.props.history.push('/todos?filter=undone')
                    break
                default:
                    this.props.history.push('/todos')
            }
        })        

    }

    renderTodos = () => {

        let search = parseSearchPath(this.props.location.search)
        
        const task = (t) => {
            return (
                <li key={t.id}>
                    <Todo 
                        onSelect={ this.selectTodo } 
                        onToggle={ this.toggleStatusTodo } 
                        onRemove={ this.removeTodo } {...t} />
                </li>)
        }
        
        const todos = () => {
            
            if (this.props.location.search) {

                if (search.filter) {
                    if (search.filter === 'done' || search.filter === 'undone') {
                        const done = search.filter === 'done' ? true : false
                        const tasks = this.props.todos.filter( t => t.done === done )
                        if (tasks.length) {
                            return tasks.map(t => {
                                return task(t)
                            })
                        } else {
                            return <p>Нет записей</p>
                        }                            
                    }
                }
            }

            return this.props.todos.map(t => {
                return task(t)
            })
        }

        const title = () => {
            switch(this.state.filter) {
                case 'done':
                    return <h2>Выполнено</h2>
                case 'undone':
                    return <h2>Выполнить</h2>
                default:
                    return <h2>Все задачи</h2>
            }
        }

        if (this.props.todos.length) {
            return (
                <div>
                    { title() }
                    <ul className='todo-list'>
                        { todos() }
                    </ul>
                    <section className="filters">
                        <h3>Выбрать группы задач</h3>
                        <select ref={select => this.filterInput = select } onChange={ this.changeLocation } name="filter" id="filter">
                            <option value="all">Все</option>
                            <option value="done">Выполнено</option>
                            <option value="undone">Выполнить</option>
                        </select>
                    </section>
                </div>
            )
        } else {
            return <p>Пустой список задач</p>
        }
    }

    removeTodo = (todoId) => {
        this.props.removeTodo(todoId)
    }

    toggleStatusTodo = (todoId) => {
        this.props.toggleStatusTodo(todoId)
    }

    selectTodo = (todo) => {
        this.props.selectTodo(todo)
        this.props.history.push('/todos/edit')
    }

    removeAllTodos = () => {
        this.props.removeAllTodos()
    }

    render () {
        return (
            <section>
                { this.renderTodos() }
                <Link to='/todos/add' style={{textDecoration:'none'}}><h3>Добавить задачу</h3></Link>
                { this.props.todos.length > 0 ? <button onClick={ () => this.removeAllTodos() }>Удалить все задачи</button> : null }
            </section>
        )
    }

}

const mapPropsToState = state => {
    return {
        todos:state.todos.tasks
    }
}

const actions = dispatch => {
    return {
        removeTodo:(todoId) => {
            dispatch(tasksActions[tasksTypes.REMOVE_TODO](todoId))
        },
        toggleStatusTodo:(todoId) => {
            dispatch(tasksActions[tasksTypes.TOGGLE_TODO_STATE](todoId))
        },
        selectTodo:(todoId) => {
            dispatch(tasksActions[tasksTypes.SELECT_TODO](todoId))
        },
        removeAllTodos:() => {
            dispatch(tasksActions[tasksTypes.RESET_TODO]())
        }
    }
}

export default connect(mapPropsToState, actions)(TodoList)