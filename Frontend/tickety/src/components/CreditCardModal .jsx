import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const CreditCardModal = ({ open, onClose, onSubmit }) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleCreditCardNumberChange = (e) => setCreditCardNumber(e.target.value);
  const handlePinChange = (e) => setPin(e.target.value);

  const handleSubmit = () => {
    if (creditCardNumber && pin) {
      onSubmit(creditCardNumber, pin);
      setCreditCardNumber('');
      setPin('');
      onClose();
    } else {
      alert("Please enter both credit card number and PIN.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Credit Card Information</DialogTitle>
      <DialogContent>
        <TextField
          label="Credit Card Number"
          type="text"
          fullWidth
          margin="normal"
          value={creditCardNumber}
          onChange={handleCreditCardNumberChange}
        />
        <TextField
          label="PIN"
          type="password"
          fullWidth
          margin="normal"
          value={pin}
          onChange={handlePinChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreditCardModal;
