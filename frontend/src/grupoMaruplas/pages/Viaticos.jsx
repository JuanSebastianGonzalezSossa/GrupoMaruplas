import { Grid} from '@mui/material'
import React from 'react'
import {ResponsiveDrawer} from '../components/sidebar'

export const Viaticos = () => {
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <ResponsiveDrawer/>
            Viaticos
        </Grid>
    )
}