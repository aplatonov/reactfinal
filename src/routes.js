import Home from './components/Home'
import About from './components/About'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

export default [
    {
        path:'/', component:Home, exact:true
    },
    {
        path:'/about', component:About
    },
    {
        path:'/todos', component:TodoList, exact:true
    },
    {
        path:'/todos/add', component:TodoForm, exact:true
    },
    {
        path:'/todos/edit', component:TodoForm, exact:true
    }
]