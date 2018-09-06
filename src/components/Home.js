import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <section>
        <h1>{this.props.config.application}</h1>
        <p>
          На примере простого списка задач<br />
          приложение демонстрирует работу react-router и <br />
          работу с хранилищем redux<br />
        </p>
        { this.props.todos.length !== 0 ? 
          <p>Всего задач в списке: { this.props.todos.length }</p> : 
          <p>Начните с <Link to='/todos/add'>добавления задачи</Link></p>}        
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config:state.global,
    todos:state.todos.tasks,
  }
}

export default connect(mapStateToProps)(Home)
