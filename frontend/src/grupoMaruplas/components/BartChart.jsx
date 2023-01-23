import React, { useEffect } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar } from 'react-chartjs-2'
import { Grid } from '@mui/material';
import { useUsers } from '../../hooks/useUsers';
import { useSelector } from 'react-redux';
import { CheckingAuth } from '../../ui/components/CheckingAuth';

export const BartChart = ({users}) => {

    var labels = [];

    var ventas = [];

    Object.keys(users).length === 0 ? <CheckingAuth/> : labels = users.map(user => user.name), ventas = users.map(user => user.acumulado) 

    const data = {
        labels: labels,
        datasets: [{
            label: 'Ventas del mes',
            data: ventas,
            backgroundColor: [
                '#BA2300',
                '#5B0B6E',
                '#6E510B',
                '#6E052A',
                '#BA6313',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                '#BA2300',
                '#5B0B6E',
                '#6E510B',
                '#6E052A',
                '#BA6313',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 0
        }]
    };


    return (
        <Grid xs={12}
            sm={10}
            md={10}
            lg={12} sx={{ display: 'flex', width: '800px', height: '200px', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
            <Bar
                data={data}
            />
        </Grid>
    )
}
