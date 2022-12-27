import Head from "next/head";
import Image from "next/image";
import { AddTodoForm } from "../components/AddTodo";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <AddTodoForm />
      </div>
    </>
  );
}
