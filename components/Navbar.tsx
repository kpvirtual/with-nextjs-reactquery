

import Link from 'next/link';
import * as React from 'react';
import styles from "../styles/components/Navbar.module.css";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
export interface INavbarProps {
}
//how to get the stock data of Tesla in python? 
export function Navbar(props: INavbarProps) {
    const { data: session } = useSession();
    const router = useRouter()
    return (

        <div className={styles.navbar}>
            <div className={styles.logo} >
                <div className="logo">Todo<span> App</span></div>

            </div>
            <div className={styles.links}>
                <Link href="/todos">Todos</Link>
                <Link href="/table">table</Link>
                <Link href="/">Add Todo</Link>
                {!session && <Link href="/login">Login</Link>}
                {session && <Link href="/login" onClick={() => {
                    signOut()
                    // router.push('/login')
                }}>logout</Link>}
            </div>
        </div>
    );
}
