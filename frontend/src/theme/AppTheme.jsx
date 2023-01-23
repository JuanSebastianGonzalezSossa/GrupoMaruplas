import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { ColorTheme } from './';


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ ColorTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}
