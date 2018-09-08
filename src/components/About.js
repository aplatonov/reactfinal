import React from 'react'

const About = (props) => {
    return (
        <section>
            <h1>О приложении</h1>
            <p>
            	Итоговое задание по курсу React от компании Mediasoft<br />
            	автор Платонов Антон<br />
            	сентябрь 2018
        	</p>
            <hr />
            <p>
                Первоначальная версия приложения <a href="https://github.com/aplatonov/reactapp/tree/task_6">https://github.com/aplatonov/reactapp/tree/task_6</a>
                <br />К сожалению, в нем не удалось заставить работать react-router вместе с redux,
                <br />Для итоговой работы взял за основу <a href="https://github.com/blokche/todolist-react-redux">https://github.com/blokche/todolist-react-redux</a>, 
                <br />перенес в него функционал, добавил работу с redux
            </p>
            <br />
        </section>
    )
}

export default About