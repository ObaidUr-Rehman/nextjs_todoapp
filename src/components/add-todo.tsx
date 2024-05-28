"use client"
import React, {FormEvent, useState} from 'react';
import {useTodos} from "@/store/todos";

const AddTodo = () => {
    const [todo, setTodo] = useState(" ")

    const {handleAddTodo} = useTodos()

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const trimmedTodo = todo.trim(); // Trim the input value
        if (trimmedTodo) { // Check if the trimmed input is not empty
            handleAddTodo(trimmedTodo);
            setTodo("");
        } else {
            alert("Input cannot be empty!");
        }
    };




    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text"  placeholder="Write your todo" name="todo " id="todo" value={todo} onChange={(event) => setTodo(event.target.value)}/>
            <button type="submit">Add More To do</button>
        </form>
    );
};




export default AddTodo;