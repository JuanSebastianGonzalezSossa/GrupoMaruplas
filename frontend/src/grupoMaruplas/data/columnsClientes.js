import { ColumnFilter } from "./columFilter";

export const columnas = [
    {
        Header: 'Id',
        accessor: 'id',
        Filter: ColumnFilter
    },
    {
        Header: 'Nombres',
        accessor: 'nombres',
        Filter: ColumnFilter
    },
    {
        Header: 'Apellidos',
        accessor: 'apellidos',
        Filter: ColumnFilter
    },
    {
        Header: 'Empresa',
        accessor: 'empresa',
        Filter: ColumnFilter
    },
    {
        Header: 'Celular',
        accessor: 'celular',
        Filter: ColumnFilter
    },
    {
        Header: 'Correo',
        accessor: 'correo',
        Filter: ColumnFilter
    },
    {
        Header: 'Asesor',
        accessor: 'user.name',
        Filter: ColumnFilter
    }
];
