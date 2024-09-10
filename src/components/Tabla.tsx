import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TablaProps<T, K extends string | number> {
    columns: Array<{ name: string, selector: (row: T) => string | number }>;
    data: T[];
    onEdit?: (id: K) => void | Promise<void>;
    onDelete: (id: K) => void | Promise<void>;
    getRowId: (row: T) => K;
}

const customStyles = {
    table: {
        style: {
            backgroundColor: 'transparent',
        },
    },
    rows: {
        style: {
            minHeight: '72px',
            fontSize: '18px',
            '&:nth-of-type(even)': {
                backgroundColor: '#add8e6',
            },
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            fontSize: '18px',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
};

const Tabla = <T, K extends string | number>({
    columns,
    data,
    onEdit,
    onDelete,
    getRowId
}: TablaProps<T, K>) => {

    const tableColumns: TableColumn<T>[] = columns.map((column) => ({
        name: column.name,
        sortable: true,
        selector: column.selector,
    }));

    const actionsColumn: TableColumn<T> = {
        name: 'Acciones',
        cell: (row: T) => (
            <div className=''>
                {onEdit && (
                    <button onClick={() => onEdit(getRowId(row))} className='btn bg-gray-100 text-gray-800 rounded py-1 px-2 md:m-3 m-1'>
                        <PencilSquareIcon className='w-6 h-6 text-black' />
                    </button>
                )}
                <button onClick={() => onDelete(getRowId(row))} className='btn bg-gray-100 text-gray-800 rounded py-1 px-2 md:m-3 m-1'>
                    <TrashIcon className='w-6 h-6 text-black' />
                </button>
            </div>
        ),
        ignoreRowClick: true,
    };

    return (
        <div className='py-5 px-7'>
            <DataTable
                columns={[...tableColumns, actionsColumn]}
                data={data}
                customStyles={customStyles}
            />
        </div>
    );
};

export default Tabla;
