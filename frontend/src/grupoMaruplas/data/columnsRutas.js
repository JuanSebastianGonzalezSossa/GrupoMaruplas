import { ColumnFilter } from "./columFilter";

export const columnas = [
    {
        Header: 'Id',
        accessor: 'id',
        Filter: ColumnFilter
    },
    {
        Header: 'Nombre',
        accessor: 'nombre',
        Filter: ColumnFilter
    },
    {
        Header: 'Ciudad',
        accessor: 'ciudad',
        Filter: ColumnFilter
    },
    {
        Header: 'Descripción',
        accessor: 'descripcion',
        Filter: ColumnFilter
    },
    {
        Header: 'Asesor',
        accessor: 'user.name',
        Filter: ColumnFilter
    }
];