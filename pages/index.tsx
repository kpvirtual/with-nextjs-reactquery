import Head from 'next/head'
import Image from 'next/image'
import { AddTodoForm } from '../components/AddTodo'
import { Navbar } from '../components/Navbar'
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <AddTodoForm />
      </div>
    </>
  )
}
