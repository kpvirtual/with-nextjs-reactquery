import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { getTodos } from '../api/todo';
import { Navbar } from '../components/Navbar';
import { TableComponent } from '../components/TableComponent';
export interface ITableProps {
}

export default function Table(props: ITableProps) {
  return (
    <div>
      <Navbar />
      <TableComponent pageSize={2}/>
    </div >
  );
}
