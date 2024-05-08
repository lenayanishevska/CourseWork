import React, { useState } from 'react'
import "./Dashboard.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useAddExpensesMutation, useGetCategoriesQuery } from '../../redux/Api/ExpesesApi';

export const ExpensesForm = ({}) => {
    const { data } = useGetCategoriesQuery();
    const categories = data ? data.data : [];

    const [addExpenses] = useAddExpensesMutation();

    const [categoryId, setCategoryId] = useState('');
    const [amount, setAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
      setCategoryId(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleCreateExpenses = async () => {
        const parsedAmount = parseFloat(amount);
        const res = await addExpenses({ categoryId, amount: parsedAmount }).unwrap();

        setCategoryId('');
        setAmount('');
        setSuccessMessage('Expense added successfully!');

        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
    }
  return (
    <div className="expences-container flex-column">
        <span>Add New Expence:</span>
        <div className="expence-type flex-column">
            <FormControl fullWidth sx={{ marginBottom: '20px'}}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="type"
                    onChange={handleChange}
                >
                    {categories.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>{item.category}</MenuItem>
                    )
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
            </FormControl>
        </div>
        <button onClick={handleCreateExpenses}>Add</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  )
}
