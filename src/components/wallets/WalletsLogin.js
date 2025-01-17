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
import { decryptPrivateKey, getPublicKey } from '../../helper/sign';
import { LINK } from '../../constant/constant'
import axios from 'axios';

const WalletsLogin = (props) => {
  const { publicKey, setValues, handleGetTransaction, handleOpen } = props
  const [errors, setErrors] = useState({
    publicKey: '',
  })

  const handleChangePublicKey = (event) => {
    if (event.target.value.trim() !== '') {
      setErrors({
        ...errors,
        publicKey: ''
      });
    }

    setValues({
      encryphted: event.target.value.trim(),
    });
  };

  const handleGetBalance = async () => {
    if (publicKey === '') {
      setErrors({
        ...errors,
        publicKey: "This field can't be blank."
      })
      return
    }
    console.log(publicKey);

    try {
      console.log("Get blance: " + publicKey)
      axios.post(`${LINK.API}/balanceAnonymous`, { address: publicKey })
        .then(function (res) {
          handleOpen("Your balance: " + res?.data?.balance, "success");
        })
        .catch(function (err) {
          if (err?.response) {
            handleOpen(err?.response?.data, "error");

          }
          else {
            handleOpen(err.message, "error");

          }
        })
    } catch (error) {
      handleOpen(error.message, 'error')
    }
  }

  const [walletTx, setWalletTx] = useState();

  const handleTransaction = async () => {
    console.log(publicKey);
    if (publicKey === '') {
      setErrors({
        ...errors,
        publicKey: "This field can't be blank."
      })
      return
    }
    try {
      await axios.post(`${LINK.API}/finishTransactionAnonymous`, { address: publicKey })
        .then(function (res) {
          setWalletTx(res.data)
          console.log(walletTx);
        })
        .catch(function (err) {
          if (err?.response) {
            handleOpen(err?.response?.data, "error");

          }
          else {
            handleOpen(err.message, "error");
          }
        })
    }
    catch (error) {
      handleOpen(error.message, 'error')
    }
  }

  return (
    <>
      <form>
        <Card>
          <CardHeader
            title="BALANCE"
            subheader="Get balance of your wallet"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Public Key"
              margin="normal"
              name="publicKey"
              onChange={handleChangePublicKey}
              value={publicKey}
              variant="outlined"
              error={errors.publicKey !== ''}
              helperText={errors.publicKey}
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
              style={{ marginLeft: '10px' }}
              color="primary"
              variant="contained"
              onClick={() => handleGetBalance()}
            >
              Get Balance
          </Button>
            {/* <Button
              style={{ marginLeft: '10px' }}
              color="primary"
              variant="contained"
              onClick={() => handleTransaction()}
            >
              Get Transaction
          </Button> */}
          </Box>
        </Card>
      </form>
    </>
  );
};

export default WalletsLogin;
