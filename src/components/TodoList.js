import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { tasksTypes, tasksActions } from '../store/tasks/tasksTypesActions'

const Todo = ({label, done, id, description, date, onToggle, onSelect, onRemove}) => {
    let className = null;
    let buttonName = 'Взять в работу'
    switch(done) {
        case 1:
            className = 'undone'
            break
        case 2:
            className = 'process'
            buttonName = 'Пометить выполненной'
            break
        case 3:
            className = 'done'
            buttonName = 'Отменить выполнение'
            break
        default:
            className = null
    }

    return (
        <div className='todo'> 
            <span className={className}>{label} {(date) ? '(' + date + ')' : ''}</span> 
            <span className='description'>{description}</span>
            <span className='todo-actions'>
                <button onClick={ () => onToggle(id) }>{buttonName}</button>
                <button className='symbols' onClick={ () => onSelect(id) }>&#9997;</button> 
                <button className='symbols' onClick={ () => onRemove(id) }>&times;</button>
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
                    this.props.history.push('/list')
                    break
                case 'done':
                    this.props.history.push('/list?filter=done')
                    break
                case 'undone':
                    this.props.history.push('/list?filter=undone')
                    break
                case 'process':
                    this.props.history.push('/list?filter=process')
                    break
                default:
                    this.props.history.push('/list')
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
            let tasks = this.props.todos
            if (this.props.location.search) {

                if (search.filter) {
                    if (search.filter === 'done' || search.filter === 'undone' || search.filter === 'process') {
                        let group = 1
                        switch(search.filter)  {
                            case 'done':
                                group = 3
                                break
                            case 'process':
                                group = 2
                                break
                            case 'undone':
                                group = 1
                        }
                        tasks = tasks.filter( t => t.done == group )                         
                    }
                }
            }

            //let sorted = this.props.todos

            if (this.props.sort !='') {
                let sort_field = this.props.sort.substring(0, this.props.sort.indexOf('_'));
                let direction = (this.props.sort.indexOf('desc') != -1) ? -1 : 1;

                tasks = tasks.sort((a, b) => {
                    if (sort_field == 'date') {
                      if (a.date === undefined && b.date !== undefined) { return 1; }
                      if (a.date !== undefined && b.date === undefined) { return -1; }
                      if (a.date === b.date) { return 0; }
                      return a.date > b.date ? direction : direction * -1;
                    }
                    if (sort_field == 'name') {
                      if (a.label === b.label) { return 0; }
                      return a.label > b.label ? direction : direction * -1;
                    }
                });
            }

            if (tasks.length) {
                return tasks.map(t => {
                    if (t.label.toLowerCase().indexOf(this.props.activeFilter.toLowerCase()) !== -1)
                        return task(t)
                })
            } else {
                return <p>Нет записей</p>
            }  
        }

        const title = () => {
            switch(this.state.filter) {
                case 'done':
                    return <h2>Выполнено</h2>
                case 'undone':
                    return <h2>Выполнить</h2>
                case 'process':
                    return <h2>Выполняется</h2>
                default:
                    return <h2>Все задачи</h2>
            }
        }

        if (this.props.todos.length) {
            return (
                <div>
                    <section className="filters">
                        <h3>Отображать задачи</h3>
                        Группа&nbsp;
                        <select ref={select => this.filterInput = select } onChange={ this.changeLocation } name="filter" id="filter">
                            <option value="all">Все</option>
                            <option value="undone">Выполнить</option>
                            <option value="process">Выполняется</option>
                            <option value="done">Выполнено</option>
                        </select>
                        &nbsp;Фильтр по названию&nbsp;
                        <input ref={ input => this.activeFilterInput = input } onChange={ evt => {this.changeActiveFilter(evt.target.value) }} id='activeFilter' type='text' />
                        &nbsp;Сортировка&nbsp;
                        <select ref={select => this.sortInput = select } onChange={ evt => {this.changeSort(evt.target.value) }} name="sort" id="sort">
                            <option value="">Без сортировки</option>
                            <option value="date_asc">Даты по возрастанию</option>
                            <option value="date_desc">Даты по убыванию</option>
                            <option value="name_asc">Название по возрастанию</option>
                            <option value="name_desc">Название по убыванию</option>
                        </select>
                    </section>
                    { title() }
                    <ul className='todo-list'>
                        { todos() }
                    </ul>
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
        this.props.history.push('/list/edit')
    }

    removeAllTodos = () => {
        this.props.removeAllTodos()
    }

    changeActiveFilter = (activeFilter) => {
        this.props.changeActiveFilter(activeFilter)
    }

    changeSort = (sort) => {
        this.props.changeSort(sort)
    }

    render () {
        return (
            <section>
                { this.renderTodos() }
                <Link to='/list/add' style={{textDecoration:'none'}}><h3>Добавить задачу</h3></Link>
                { this.props.todos.length > 0 ? <button onClick={ () => this.removeAllTodos() }>Удалить все задачи</button> : null }
            </section>
        )
    }

}

const mapPropsToState = state => {
    return {
        todos:state.todos.tasks,
        activeFilter:state.todos.activeFilter,
        sort:state.todos.sort
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
        },
        changeActiveFilter:(activeFilter) => {
            dispatch(tasksActions[tasksTypes.CHANGE_FILTER](activeFilter))
        },
        changeSort:(sort) => {
            dispatch(tasksActions[tasksTypes.CHANGE_SORT](sort))
        }
    }
}

export default connect(mapPropsToState, actions)(TodoList)