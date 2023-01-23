import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ViewListIcon from '@mui/icons-material/ViewList';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { LogoutOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import '../styles/sideBar.css'
import { useUiStore } from '../../hooks/useUiStore';
import { ModalPedidos } from '../views/ModalPedidos';
import { ModalFinalizarPedido } from '../views/ModalFinalizarPedido';
import LogoEmpresa from '../../../public/logo_empresa.png'


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export const ResponsiveDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, startLogout } = useAuthStore();
  const { openPedidoModal } = useUiStore();
  const { pedidos } = useSelector(state => state.pedido);


  const mostrarPedido = () => {
    if (pedidos.length > 0) {
      openPedidoModal()
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>

        <Toolbar>

          <Grid container direction='row' justifyContent='space-between' alignItems='center' >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {user.name}
            </Typography>
            <Grid>
              <IconButton sx={{ color: 'whitesmoke', fontSize: '16px' }} onClick={mostrarPedido}> ({pedidos.length})
                <ListAltIcon />
              </IconButton>
              <IconButton color='error' onClick={startLogout}>
                <LogoutOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >


        <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '0px', marginTop: '10px' }}>
          <Link component={RouterLink} style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: 15 }} variant='h6' color='inherit' to="/">
            <img
              src={LogoEmpresa}
              alt="Grupo Maruplas S.A.S"
              style={{ width: '82px', height: '66px', padding: '0px', margin: '0px' }}
            ></img>
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {user.rol == 'Administrador' ? <Link component={RouterLink} style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: 15 }} variant='h6' color='inherit' to="/Asesores">
            <ListItem key={'Asesores'} disablePadding>
              <ListItemButton
                sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <SupportAgentIcon />
                </ListItemIcon>
                <ListItemText primary={'Asesores'} />
              </ListItemButton>
            </ListItem>
          </Link> : null}

          <Link component={RouterLink} style={{ textDecoration: 'none' }} variant='h6' color='inherit' to="/Rutas">
            <ListItem key={'Rutas'} disablePadding>
              <ListItemButton sx={{
                color: 'primary.main',
                ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
              }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary={'Rutas'} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link component={RouterLink} style={{ textDecoration: 'none' }} variant='h6' color='inherit' to="/Clientes">
            <ListItem key={'Clientes'} disablePadding>
              <ListItemButton sx={{
                color: 'primary.main',
                ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
              }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={'Clientes'} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link component={RouterLink} style={{ textDecoration: 'none' }} variant='h6' color='inherit' to="/Productos">
            <ListItem key={'Productos'} disablePadding>
              <ListItemButton sx={{
                color: 'primary.main',
                ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
              }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary={'Productos'} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link component={RouterLink} style={{ textDecoration: 'none' }} variant='h6' color='inherit' to="/Pedidos">
            <ListItem key={'Pedidos'} disablePadding>
              <ListItemButton sx={{
                color: 'primary.main',
                ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
              }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary={'Pedidos'} />
              </ListItemButton>
            </ListItem>
          </Link>
          {/* <Link component={RouterLink} style={{ textDecoration: 'none' }} variant='h6' color='inherit' to="/Viaticos">
            <ListItem key={'Viaticos'} disablePadding>
              <ListItemButton sx={{
                color: 'primary.main',
                ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
              }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary={'Viaticos'} />
              </ListItemButton>
            </ListItem>
          </Link> */}
        </List>
        <Divider />
        {/* <List>
          <Link component={RouterLink} style={{ textDecoration: 'none' }} variant='h6' color='inherit' to="/ReportePedidos">
            <ListItem key={'Reporte pedidos'} disablePadding>
              <ListItemButton sx={{
                color: 'primary.main',
                ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
              }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={'Reporte pedidos'} />
              </ListItemButton>
            </ListItem>
          </Link> */}
        {/* <Link component={RouterLink} style={{ textDecoration: 'none' }} variant='h6' color='inherit' to="/ReporteViaticos">
            <ListItem key={'Reporte viaticos'} disablePadding>
              <ListItemButton sx={{
                color: 'primary.main',
                ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
              }}>
                <ListItemIcon sx={{
                  color: 'primary.main',
                  ':hover': { backgroundColor: 'primary.main', opacity: 0.8, color: 'primary.blanco' },
                }}>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary={'Reporte viaticos'} />
              </ListItemButton>
            </ListItem>
          </Link> */}
        {/* </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <ModalPedidos />
      <ModalFinalizarPedido />
    </Box>
  );
}