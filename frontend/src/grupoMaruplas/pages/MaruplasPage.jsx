import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ResponsiveDrawer } from '../components/sidebar'
import { BartChart } from '../components/BartChart'
import { useSelector } from 'react-redux'
import { usePedidos } from '../../hooks/usePedidos'
import { useUsers } from '../../hooks/useUsers'

export const MaruplasPage = () => {

    const { getUser } = useUsers();

    const { users } = useSelector(state => state.user);

    useEffect(() => {
        getUser()
      }, [])

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
            <ResponsiveDrawer />

            <BartChart users={users}/>
        </Grid>
    )
}