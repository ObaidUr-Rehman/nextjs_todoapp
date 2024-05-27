"use client"

import {useTodos} from "@/store/todos";
import {useSearchParams} from "next/navigation";

const Todos = () => {

    const {todos, toggleTodoAsCompleted, handleTodoDeleted } = useTodos()

    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos')

    let filteredTodos = todos;
    if (todosFilter === "active") {
        filteredTodos = todos.filter((todo) => !todo.completed);
    } else if (todosFilter === "completed") {
        filteredTodos = todos.filter((todo) => todo.completed);
    }

    return (
        <ul className="main-task">

            {
                filteredTodos.map((todo) => {
                    return <li key={todo.id}>


                            <input type="checkbox" name="" id={`todo-${todo.id}`} checked={todo.completed}
                            onChange={() => toggleTodoAsCompleted(todo.id)}/>

                            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

                        {
                            todo.completed && (
                                <button type="button" onClick={() =>handleTodoDeleted(todo.id)}>Delete</button>
                            )
                        }

                    </li>
                })
            }
        </ul>
    )
}

export default Todos;