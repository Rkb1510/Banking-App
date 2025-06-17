// components/LoginForm.js
import React, {useState} from "react";
import { TextField, Button, Typography, Container, Paper, Stack, emphasize }from "@mui/material";
import axios from "axios";

const LoginForm =() => {
    const [credentials, setCredential] = useState({email:'', password:''});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setCredential({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
            if(res.status === 200) { 
              setMessage('Login Successful');

              // Storeing user info and token in local storage
              localStorage.setItem('token',res.data.token);
              localStorage.setItem('userId', res.data.userId);
              localStorage.setItem('userName', res.data.name);

              //Redirect to dashboard
              window.location.href=('/dashboard');
            }
            else {
                setMessage('Login failed');
            }
        } catch (error) {
            setMessage('Error:'+(error?.response?.data?.title || 'Something went wrong'));
        }
    };

    return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Login</Button>
            {message && (
              <Typography variant="body2" color={message.includes('Success') ? 'green' : 'error'}>
                {message}
              </Typography>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;