
import React, { Suspense } from 'react';
import AddTodo from "@/components/add-todo";
import Todos from "@/components/todos";
import Navbar from "@/components/navbar";
import "./globals.css";
import { RiTodoLine } from "react-icons/ri";

export default function Home() {
    return (
        <main>
            <h2><RiTodoLine className="icons"/> SCHEDULE NEXT + TYPESCRIPT PROJECT <RiTodoLine className="icons"/></h2>
            <Suspense fallback={<div>Loading Todos...</div>}>
            <Navbar/>
            <AddTodo/>
                <Todos/>
            </Suspense>
        </main>
    );
}
