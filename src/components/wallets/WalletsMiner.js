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
import { getPublicKey, decryptPrivateKey } from '../../helper/sign';
import { LINK } from '../../constant/constant'
import axios from 'axios';

const WalletsMiner = (props) => {
  const { publicKey, setValues, handleOpen } = props
  // const [values, setValues] = useState({
  //   publicKey: ''
  // });
  const [errors, setErrors] = useState({
    publicKey: ''
  })

  const handleChange = (event) => {
    if (event.target.value.trim() !== '') {
      setErrors({
        ...errors,
        publicKey: ''
      });
    }

    setValues({
      encryphted: event.target.value.trim()
    });
  };

  const handleMine = () => {
    if (publicKey === '') {
      setErrors({
        ...errors,
        publicKey: "This field can't be blank."
      })
      return
    }
    console.log(publicKey);
    try {
      axios.post(`${LINK.API}/mineBlockAnonymous`, { address: publicKey })
        .then(function (res) {
          handleOpen("Start mining", "success");
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

  return (
    <>
      <form>
        <Card>
          <CardHeader
            title="Mine Coin"
            subheader="Start mining at our server. NEED TO LOGIN TO USE"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Public Key"
              margin="normal"
              name="public"
              onChange={handleChange}
              value={publicKey}
              variant="outlined"
              error={errors.public !== ''}
              helperText={errors.public}
            />
          </CardContent>        
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
              onClick={() => handleMine()}
            >
              Start mining
          </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default WalletsMiner;
