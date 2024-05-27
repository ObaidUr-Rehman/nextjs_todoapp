
import AddTodo from "@/components/add-todo";
import Todos from "@/components/todos";
import Navbar from "@/components/navbar";
import "./globals.css";
import { RiTodoLine } from "react-icons/ri";

export default function Home() {
  return (
      <main>
          <h2><RiTodoLine className="icons"/>  SCHEDULE NEXT + TYPESCRIPT PROJECTS <RiTodoLine className="icons"/></h2>
          <Navbar/>
          <AddTodo/>
          <Todos/>
      </main>
  );
}
