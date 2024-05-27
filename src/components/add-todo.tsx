"use client"
import React, {FormEvent, useState} from 'react';
import {useTodos} from "@/store/todos";

const AddTodo = () => {
    const [todo, setTodo] = useState(" ")

    const {handleAddTodo} = useTodos()

    const handleFormSubmit = (e : FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo(" ")
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text"  placeholder="Write your todo" name=" " id=" " value={todo} onChange={(event) => setTodo(event.target.value)}/>
            <button type="submit">Add TODOO</button>
        </form>
    );
};

export default AddTodo;