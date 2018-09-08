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
        path:'/list', component:TodoList, exact:true
    },
    {
        path:'/list/add', component:TodoForm, exact:true
    },
    {
        path:'/list/edit', component:TodoForm, exact:true
    }
]