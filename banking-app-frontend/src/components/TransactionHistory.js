//components/TransactionHistory.js

import React, {useEffect, useState} from "react";
import { Typography, Paper, List, ListItem, ListItemText, setRef } from "@mui/material";
import axios from "axios";

const TransactionHistory =() => {
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/transactions/user/${userId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTransactions(res.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        if (userId && token) fetchTransaction();
    }, [userId, token]);

    return (
        <Paper elevation={3} sx={{p:3, mt:4}}>
            <Typography variant="h6" gutterBottom>
                Transaction History
            </Typography>
            <List>
                {transactions.length === 0 && (
                    <ListItem><ListItemText primary="No Transaction yet." /></ListItem>
                )}
                {transactions.map(tx => (
                    <ListItem key={tx.transactionsId}>
                        <ListItemText
                            primary={`${tx.type} of ${tx.amount}`}
                            secondary={new Date(tx.date).toLocaleDateString()}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TransactionHistory;