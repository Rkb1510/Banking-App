// components/RegisterForm.js

import React, { useState } from 'react';
import { TextField,  Button,  Typography,  Container, Paper,  Stack,} from '@mui/material';
import axios from 'axios';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/register', userData);
      console.log('Registering user:',userData);
      if (res.status === 201) {
        setMessage('User registered successfully!');
      } else {
        setMessage('Registration failed.');
      }
    } catch (error) {
      setMessage('Error: ' + (error?.response?.data?.title || 'Something went wrong'));
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Name" name="name" value={userData.name} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" type="email" value={userData.email} onChange={handleChange} fullWidth />
            <TextField label="Password" name="password" type="password" value={userData.password} onChange={handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary">Register</Button>
            {message && (
              <Typography variant="body2" color={message.includes('success') ? 'green' : 'error'}>
                {message}
              </Typography>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
export default RegisterForm;