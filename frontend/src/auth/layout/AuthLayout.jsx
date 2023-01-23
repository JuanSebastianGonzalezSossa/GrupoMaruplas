import { Grid, Typography } from '@mui/material';
import logoEmpresa from '../../../public/Logo_Blanco.png'

export const AuthLayout = ({ children, title = '' }) => {
  return (

    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

      <Grid item
        className='animate__animated animate__zoomInDown'
        alignItems="center"
        justifyContent="center"
        sx={{ mr: 5 }}>
        <img src={logoEmpresa} alt="logo Empresa" />
      </Grid>


      <Grid item
        alignItems="center"
        textAlign="center"
        xs={9}
        sm={5}
        md={5}
        lg={3}
        sx={{
          width: { sm: 380 },
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3
        }}>

        <Typography variant='h5' sx={{ mb: 1, fontFamily: 'Vegur, Verdana, sans-serif' }}>{title}</Typography>


        {children}

      </Grid>

    </Grid>

  )
}
