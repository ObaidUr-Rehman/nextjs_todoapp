"use client"
import React, {useState} from 'react';
import {useTodos, Todo} from "@/store/todos";
import {useSearchParams} from "next/navigation";

const Todos = () => {

    const {todos, toggleTodoAsCompleted, handleTodoDeleted, handleTodoUpdated } = useTodos()

    const [isEditing, setIsEditing] = useState<string| null>(null)
    const [editTask, setEditTask] = useState<{ id: string, task: string }>({ id: '', task: '' });

    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos')

    let filteredTodos = todos;
    if (todosFilter === "active") {
        filteredTodos = todos.filter((todo) => !todo.completed);
    } else if (todosFilter === "completed") {
        filteredTodos = todos.filter((todo) => todo.completed);
    }

    const startEditing = (todo: Todo) => {
        setIsEditing(todo.id);
        setEditTask({ id: todo.id, task: todo.task });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTask({ ...editTask, task: e.target.value });
    };

    const saveEdit = () => {
        const existingTodo = todos.find(todo => todo.id === editTask.id);
        if (existingTodo) {
            handleTodoUpdated({
                ...existingTodo,
                task: editTask.task
            });
            setIsEditing(null);
        }
    };

    return (
        <ul className="main-task">
            {filteredTodos.map((todo) => (
                <li key={todo.id}>
                    <input
                        type="checkbox"
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => toggleTodoAsCompleted(todo.id)}
                    />
                    {isEditing === todo.id ? (
                        <input
                            type="text"
                            value={editTask.task}
                            onChange={handleEditChange}
                        />
                    ) : (
                        <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                    )}

                    {isEditing === todo.id ? (
                        <button type="button" onClick={saveEdit} className="save-btn">
                            Save
                        </button>
                    ) : (
                        !todo.completed && (
                            <button type="button" onClick={() => startEditing(todo)} className="edit-btn">
                            Edit
                        </button>)

                    )}
                    {todo.completed && (
                        <button type="button" onClick={() => handleTodoDeleted(todo.id)}>
                            Delete
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default Todos;