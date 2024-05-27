"use client"
import {createContext, ReactNode, useContext, useState} from "react";

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;  // call signature
    handleTodoDeleted: (id: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({children}: { children: ReactNode }) => {

    const [todos, setTodos] = useState<Todo[]>(() => {
        try{
            const newTodos = localStorage.getItem('todos') || "[]";
            return JSON.parse(newTodos) as Todo[]
        }catch (e) {
            return []
        }

    })

    const handleAddTodo = (task: string) =>

        setTodos((prev: Todo[]) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev,
            ];
            console.log(newTodos)
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        });


    // if the task is completed then show delete button
    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((task) => {
                if(task.id===id){
                    return {...task, completed: !task.completed}
                }
                return task;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }


    // if the task is deleted

    const handleTodoDeleted = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id !== id)
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }


    return (
        <todosContext.Provider value={{todos, handleAddTodo, toggleTodoAsCompleted, handleTodoDeleted}}>
            {children}
        </todosContext.Provider>
    )
}

// context api

export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("useTodos must be used within the TodosProvider");
    }
    return todosContextValue;
}