import { Grid, Typography } from '@mui/material';
import { StarOutline } from '@mui/icons-material';


export const NothingSelectedView = () => {
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={ 1 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', minwidth: '100vh', backgroundColor: 'white', borderRadius: 3 }}
    >
        <Grid item xs={ 12 }>
            <StarOutline sx={{ fontSize: 100, color: 'primary.main' }} />
        </Grid>
        <Grid item xs={ 12 }>
            <Typography color="black" variant='h6'>Ingresa algo</Typography>
        </Grid>
    </Grid>
  )
}