import { ColumnFilter } from "./columFilter";

export const columnas = [
    {
        Header: 'Id',
        accessor: 'id',
        Filter: ColumnFilter
    },
    {
        Header: 'Cliente',
        accessor: 'Cliente',
        Filter: ColumnFilter
    },
    {
        Header: 'Ruta',
        accessor: 'Ruta',
        Filter: ColumnFilter
    },
    {
        Header: 'Precio total',
        accessor: 'precioTotal',
        Filter: ColumnFilter
    },
    {
        Header: 'Asesor',
        accessor: 'user.name',
        Filter: ColumnFilter
    }
];
