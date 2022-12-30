import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import * as React from 'react';
import { getTodos } from '../api/todo';
import { useSession } from "next-auth/react"
import Router from "next/router";

export interface ITodoTableProps {
}

// Queries


export function TodoTable(props: ITodoTableProps) {
    const { data:userData, status } = useSession()
    const { data, isLoading } = useQuery(["todos"], getTodos)
    console.log(userData)
    if (isLoading) {
        return <h1>Loading</h1>
    }
    
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">

                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Task Title
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Task Description
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data && data?.posts?.map((todo: any) => {
                                        return (
                                            <tr className="border-b" tabIndex={todo.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{todo.title}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {todo.body}
                                                </td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
