import Link from 'next/link';
import * as React from 'react';
import styles from "../styles/components/Navbar.module.css"
export interface INavbarProps {
}

export function Navbar(props: INavbarProps) {
    return (

        <div className={styles.navbar}>
            <div className={styles.logo} >
                <div className="logo">Todo<span> App</span></div>

            </div>
            <div className={styles.links}>
                <Link href="/todos">Todos</Link>
                <Link href="/">Add Todo</Link>
            </div>
        </div>
    );
}
