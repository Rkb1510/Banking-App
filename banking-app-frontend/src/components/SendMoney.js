//components/SendMoney.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Stack } from '@mui/material';
import axios from 'axios';

const SendMoney = ({ userId, onTransactionComplete }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!recipientEmail || !amount) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (Number(amount) <= 0) {
      setMessage('Amount must be greater than zero.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/transactions/send', 
        { senderId: userId, recipientEmail, amount: Number(amount) }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setMessage('Money sent successfully!');
        setRecipientEmail('');
        setAmount('');
        onTransactionComplete(); // e.g. refresh dashboard or transaction history
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6">Send Money</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Recipient Email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
          {message && (
            <Typography color={message.includes('successfully') ? 'green' : 'error'}>
              {message}
            </Typography>
          )}
        </Stack>
      </form>
    </Paper>
  );
};

export default SendMoney;