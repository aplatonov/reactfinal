import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { tasksTypes, tasksActions } from '../store/tasks/tasksTypesActions'

class TodoForm extends Component {

    state = {
        success:false
    }

    createTask = (label, description, date, done = false) => {
        return {
            label:label,
            description:description,
            date:date,
            done:Number.parseInt(done),
            id:uuid.v1()
        }
    }

    isFormValid = () => {
        
        if (!this.labelInput.value.trim().length) {
            this.labelInput.focus()
            return false
        } 

        return true

    }

    componentWillUnmount () {
        if (this.props.todo) {
            this.props.unselectTodo()
        }
    }

    handleForm = (e) => {
        e.preventDefault();
        this.setState({success:false})
        if (this.isFormValid() && !this.props.todo) {
            const task = this.createTask(
                this.labelInput.value.trim(),
                this.descriptionInput.value.trim(),
                this.dateInput.value.trim(),
                this.doneInput.value
            )
            this.props.addTodo(task)
            this.form.reset()
            this.labelInput.focus()
            this.setState({success:true})
        } else if (this.isFormValid() && this.props.todo) {
            const todo = {
                label:this.labelInput.value.trim(),
                description:this.descriptionInput.value.trim(),
                date:this.dateInput.value.trim(),
                done:Number.parseInt(this.doneInput.value),
                id:this.props.todo.id
            }
           this.props.updateTodo(todo)
           this.props.history.push('/list')
        }
    }

    render () {
        return (
            <form className='todo-form' ref={ form => this.form = form } onSubmit={ this.handleForm }>
                <h2>{ this.props.todo ? 'Редактировать задачу' : 'Добавить задачу'}</h2>
                <div>
                    <label htmlFor='label'>Название задачи</label>
                    <input defaultValue={(this.props.todo && this.props.todo.label) ? this.props.todo.label : ''} ref={ label => this.labelInput = label }  id='label' type='text' />
                </div>
                <div>
                    <label htmlFor='description'>Описание задачи</label>
                    <textarea defaultValue={(this.props.todo && this.props.todo.description) ? this.props.todo.description : ''} ref={ description => this.descriptionInput = description }  id='description' />
                </div>
                <div>
                    <label htmlFor='date'>Срок</label>
                    <input defaultValue={(this.props.todo && this.props.todo.date) ? this.props.todo.date : ''} ref={ date => this.dateInput = date }  id='date' type='text' />
                </div>
                <div>
                    <label htmlFor='done'>Статус</label>
                    <select defaultValue={(this.props.todo && this.props.todo.done) ? this.props.todo.done : 1} ref={done => this.doneInput = done } id="done">
                        <option value="1">Выполнить</option>
                        <option value="2">Выполняется</option>
                        <option value="3">Выполнено</option>
                    </select>
                </div>
                <input type='submit' value={this.props.todo ? 'Сохранить изменения' : 'Сохранить'} />
                { this.state.success && <p onClick={ () => this.setState({success:false}) }>Задача успешно добавлена</p> }
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        todo:state.todos.updatedTask
    }
}

const actions = dispatch => {
    return {
        addTodo:(todo) => {
            dispatch(tasksActions[tasksTypes.ADD_TODO](todo))
        },
        updateTodo:(todo) => {
            dispatch(tasksActions[tasksTypes.UPDATE_TODO](todo))
        },
        unselectTodo:() => {
            dispatch(tasksActions[tasksTypes.SELECT_TODO](null))
        }
    }
}

export default connect(mapStateToProps, actions)(TodoForm)