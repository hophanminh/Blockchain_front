import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Snackbar,
  Alert
} from '@material-ui/core';
import { createTransaction, decryptPrivateKey } from '../../helper/sign';
import { LINK } from '../../constant/constant'
import axios from 'axios';

const WalletsTransfer = (props) => {
  const { encryphted, password, handleOpen } = props
  const [values, setValues] = useState({
    publicKey: '',
    privateKey: '',
    amount: ''
  });
  const [errors, setErrors] = useState({
    publicKey: '',
    privateKey: '',
    amount: ''
  })

  const handleChange = (event) => {
    if (event.target.value.trim() !== '') {
      setErrors({
        ...errors,
        [event.target.name]: ''
      });
    }

    setValues({
      ...values,
      [event.target.name]: event.target.value.trim()
    });
  };


  const sendTransaction = () => {
    if (values.publicKey === '') {
      setErrors({
        ...errors,
        publicKey: "This field can't be blank."
      })
      return
    }
    if (values.privateKey === '') {
      setErrors({
        ...errors,
        privateKey: "This field can't be blank."
      })
      return
    }
    if (values.amount === '') {
      setErrors({
        ...errors,
        amount: "This field can't be blank."
      })
      return
    }

    if (isNaN(values.amount)) {
      setErrors({
        ...errors,
        amount: "This field must be integer number."
      })
      return
    }
    console.log("Publickey: " + values.publicKey);
    console.log("PrivateKey: " + values.privateKey);
    console.log("Amount: " + values.amount);

    // get unSpent
    axios.get(`${LINK.API}/unSpent`)
      .then(function (res) {
        const unSpent = res.data
        // get transaction pool
        axios.get(`${LINK.API}/pool`)
          .then(function (res) {
            const pool = res.data
            try {
              // create and sign transaction locally
              const tx = createTransaction(values.publicKey, Number(values.amount), values.privateKey, unSpent, pool)
              console.log(tx)
              // send transaction to server
              axios.post(`${LINK.API}/sendTransactionAnonymous`, { transaction: tx, sender : tx.sender, reeceiver: tx.receiver, amount: tx.txOuts[0].amount, privateKey: values.privateKey})
                .then(function (res) {
                  handleOpen("Created transaction successfully. Now wait for someone to mine it", "success");
                })
                .catch(function (err) {
                  if (err?.response && err?.response?.data) {
                    handleOpen(err?.response?.data, "error");
                  }
                  else {
                    handleOpen(err.message, "error");
                  }
                })
            } catch (err) {
              handleOpen(err.message, "error");
            }
          })
          .catch(function (err) {
            handleOpen(err.message, "error");
          })
      })
      .catch(function (err) {
        handleOpen(err.message, "error");
      })
  }

  return (
    <>
      <form>
        <Card>
          <CardHeader
            title="Create new transaction"
            subheader="Send coin to another user through their public key. NEED TO LOGIN TO USE"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Public Key"
              margin="normal"
              name="publicKey"
              onChange={handleChange}
              value={values.publicKey}
              variant="outlined"
              error={errors.publicKey !== ''}
              helperText={errors.publicKey}
            />
            <TextField
              fullWidth
              label="Private key"
              margin="normal"
              name="privateKey"
              onChange={handleChange}
              value={values.privateKey}
              variant="outlined"
              error={errors.privateKey !== ''}
              helperText={errors.privateKey}
            />
            <TextField
              fullWidth
              label="Amount"
              margin="normal"
              name="amount"
              onChange={handleChange}
              value={values.amount}
              variant="outlined"
              error={errors.amount !== ''}
              helperText={errors.amount}
            />
            
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => sendTransaction()}
            >
              Create
          </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default WalletsTransfer;
