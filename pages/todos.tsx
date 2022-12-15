import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { getTodos } from '../api/todo';
import { Navbar } from '../components/Navbar';
import { TodoTable } from '../components/TodoTable';
export interface ITodosProps {
}

export default function Todos(props: ITodosProps) {

    return (
        <>
            <Navbar />
            <TodoTable />
        </>
    );
}
