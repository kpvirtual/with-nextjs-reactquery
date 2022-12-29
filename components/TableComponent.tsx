
import * as React from 'react';
import { useReactTable } from "@tanstack/react-table";
import { useTable, Column, useSortBy, TableOptions, usePagination } from "react-table";
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/todo';

export interface ITableComponentProps {
    pageSize: Number,
    // ka:string
}


interface Data {
    id: number;
    title: string;
    body: string;
}
const columns: Column<Data>[] = [
    {
        Header: "Id",
        Footer: "Id",
        accessor: "id"
    },
    {
        Header: "Title",
        Footer: "Title",
        accessor: "title"
    },
    {
        Header: "Body",
        Footer: "Body",
        accessor: "body"
    }
];

export function TableComponent(props: ITableComponentProps) {
    const { data, isLoading, isFetched } = useQuery(["todos"], getTodos);
    const [tableData, setTableData] = React.useState([]);
    React.useEffect(() => {
        isFetched && setTableData(data);
    }, [isFetched, data]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable<Data>({ data: tableData, columns, initialState: { pageSize: 10 } as any, }, useSortBy, usePagination);
    if (isLoading) {
        return <h1>Loading</h1>
    }
    console.log({ page })
    return (
        <React.Fragment>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div style={{ marginLeft: "300px" }}>
                        <div>
                            <input type="checkbox" {...getToggleHideAllColumnsProps()} /> Toggle All
                        </div>
                        {allColumns.map(column => (
                            <div key={column.id}>

                                <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
                                <label className='form-label inline-block mb-2 text-gray-700'>{column?.Header}
                                </label>
                            </div>
                        ))}
                        <br />
                    </div>
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full"  {...getTableProps()}>
                                <thead className="border-b">
                                    {
                                        headerGroups.map(headerGroup => (
                                            <tr className="border-b" {...headerGroup.getHeaderGroupProps()}>
                                                {
                                                    headerGroup.headers.map(column => (
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" {...column.getHeaderProps()}>
                                                            {
                                                                column.render('Header')}
                                                        </th>
                                                    ))}
                                            </tr>
                                        ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {
                                        page?.map(row => {
                                            prepareRow(row)
                                            return (
                                                <tr className="bg-white border-b" {...row.getRowProps()}>
                                                    {
                                                        row.cells.map(cell => {
                                                            return (
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" {...cell.getCellProps()}>
                                                                    {
                                                                        cell.render('Cell')}
                                                                </td>
                                                            )
                                                        })}
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}>
                    {[10, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </React.Fragment>
    )

}














