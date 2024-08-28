import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import '../index.css';
import { Data } from '../utilities/Data';


interface TablaProps {
    columns: string[];
    data: Data[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const Tabla: React.FC<TablaProps> = ({ columns, data, onEdit, onDelete }) => {
    
    const tableColumns: TableColumn<Data>[] = columns.map((column) => ({
        name: column,
		sortable: true,
        selector: (row: Data) => row[column.toLowerCase() as keyof Data] as string | number,
    }));

    const actionsColumn: TableColumn<Data> = {
        name: 'Acciones',
        cell: (row: Data) => (
            <div className=''>
                <button onClick={() => onEdit(row.id)} className='btn bg-gray-100 text-gray-800 rounded py-1 px-2 md:m-3 m-1'>Editar</button>
                <button onClick={() => onDelete(row.id)} className='btn bg-gray-100 text-gray-800 rounded py-1 px-2 md:m-3 m-1'>Eliminar</button>
            </div>
        ),
        ignoreRowClick: true,
    };

    return (
        <div className='m-5 py-10'>
            <DataTable columns={[...tableColumns, actionsColumn]} data={data} defaultSortFieldId={1}/>
        </div>
    );
};

export default Tabla;