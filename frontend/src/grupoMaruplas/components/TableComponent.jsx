import { Delete, Edit } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useServices } from '../../hooks/UseServices';
import { useUiStore } from '../../hooks/useUiStore';
import '../styles/Table.css'
import { usePedidos } from '../../hooks/usePedidos';
import { useSelector } from 'react-redux';
import { createPdf } from '../../helpers/Pdf';
import DownloadIcon from '@mui/icons-material/Download';
import { useAuthStore } from '../../hooks/useAuthStore';

export const TableComponent = ({ columnas, filas, api }) => {

    const [data, setData] = useState(filas);

    const columns = useMemo(() => columnas, []);

    const { DeletingPedidos } = usePedidos();

    const { removeAcumulado } = useAuthStore();

    useEffect(() => {
        setData(filas);
    }, [filas]);

    const { OpenSuccess, updateNow } = useUiStore();

    const { startDeletingRuta, startDeletingClientes } = useServices();

    const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow, state } = useTable({
        columns,
        data
    }, useFilters)

    const AbrirEditar = (actual) => {
        updateNow(actual)
        OpenSuccess()
    }

    const AbrirDelete = (actual) => {
        updateNow(actual)
        Swal.fire({
            title: 'Estas seguro?',
            text: "Lo que vas a hacer no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                if (api == 'pedidos') {
                    DeletingPedidos(actual);
                    console.log()
                    removeAcumulado(parseInt(actual.precioTotal.replace(".","").replace(".","").replace(".","").replace("COL","")))
                } else if (api == 'customers') {
                    startDeletingClientes(actual, api);
                } else {
                    startDeletingRuta(actual, api);
                }

            }
        })
    }


    return (
        <TableContainer className='container' component={Paper}>
            <Table sx={{ minWidth: 650 }} {...getTableProps()} aria-label="simple table">
                <TableHead sx={{ minWidth: 650, backgroundColor: 'third.main', fontWeight: 'bold' }} >
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 15, color: 'primary.blanco' }}
                                    {...column.getHeaderProps()}>{column.render('Header')}
                                    <Grid>{column.canFilter ? "" : null}</Grid></TableCell>

                            ))
                            }
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: '', fontSize: 15, color: 'primary.blanco' }}>Acciones</TableCell>
                        </TableRow>
                    ))
                    }
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map((cells) => {

                                    return <TableCell {...cells.getCellProps()}>{cells.render('Cell')}</TableCell>
                                })}
                                <TableCell><IconButton sx={{
                                    color: 'secondary.main',
                                    backgroundColor: 'white',
                                    ':hover': { backgroundColor: 'fourth.main', opacity: 0.8 },
                                }} onClick={() => AbrirEditar(row.original)}> {api == 'pedidos' ? <VisibilityIcon sx={{ fontSize: 22 }}></VisibilityIcon> : <Edit sx={{ fontSize: 22 }}></Edit>}</IconButton>
                                    <IconButton sx={{
                                        color: 'error.main',
                                        backgroundColor: 'white',
                                        ':hover': { backgroundColor: 'white', opacity: 0.4 },
                                    }} onClick={() => AbrirDelete(row.original)}><Delete></Delete></IconButton>
                                    {api == 'pedidos' ? <IconButton sx={{
                                        color: 'primary.main',
                                        backgroundColor: 'white',
                                        ':hover': { backgroundColor: 'white', opacity: 0.4 },
                                    }} onClick={() => createPdf(row.original)}><DownloadIcon></DownloadIcon></IconButton> : null}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
