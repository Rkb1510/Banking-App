// components/Dashboard.js

import React, {useEffect, useState} from "react";
import { Typography, Container, Paper } from "@mui/material";
import axios from 'axios';
import TransactionHistory from "./TransactionHistory";
import SendMoney from './SendMoney';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId){
            fetchUser();
        }
    }, [userId]);

    return (
        <Container maxWidth='sm'>
            <Paper elevation={3} sx={{p:4,mt:5}}>
                {user ?(
                    <>
                        <Typography variant="h5" gutterBottom>
                            Welcome, {user.name}!
                        </Typography>
                        <Typography variant="body1">
                            Account Balance: ${user.accountBalance}
                        </Typography>

                        <SendMoney userId={userId} onTransactionComplete={() =>window.location.reload()} />

                        <TransactionHistory userId={userId} />
                    </>
                ) : (
                    <Typography variant="body1">Loading Dashboard...</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Dashboard;