// components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BankApp
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" href="/">Home</Button>

          {!isAuthenticated && (
            <>
              <Button color="inherit" href="/register">Register</Button>
              <Button color="inherit" href="/login">Login</Button>
            </>
          )}
          
          {isAuthenticated && (
            <>
              <Button color="inherit" href="/dashboard">Dashboard</Button>
              <Button
                color="inherit"
                onClick={()=>{
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
