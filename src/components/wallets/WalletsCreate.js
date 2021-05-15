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
import { getPublicKey, generatePrivateKey } from '../../helper/sign';

const WalletsCreate = (props) => {
  const { handleOpen } = props
  const [values, setValues] = useState({
    publicKey: '',
    privateKey: ''
  });


  const handleCreate = () => {
    const privateKey = generatePrivateKey();
    const publicKey = getPublicKey(privateKey);
    setValues({publicKey: publicKey, privateKey: privateKey});
    // handleOpen("Your encrypted privateKey: " + publicKey, "success")
  }

  const handleGetPrivateKey = () => {
    handleOpen("Your privateKey: " + values.privateKey, "success")
  }

  return (
    <>
      <form>
        <Card>
          <CardHeader
            title="Create wallet"
            subheader="Enter password We will create it for you."
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Public Key"
              margin="normal"
              name="password"
              value={values.publicKey}
              variant="outlined"
              disabled
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
              onClick={() => handleCreate()}
            >
              Generate Key
          </Button>
          <Button
              color="primary"
              variant="contained"
              onClick={() => handleGetPrivateKey()}
            >
              Get private Key
          </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default WalletsCreate;
