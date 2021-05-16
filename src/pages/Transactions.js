import { Helmet } from 'react-helmet';
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestTransactions from '../components/transaction/LatestTransactions';
import TotalTransaction from '../components/dashboard/TotalTransaction';
import { LINK } from '../constant/constant'
import axios from 'axios';

const Transactions = () => {
  const [txs, setTxs] = useState([]);

  useEffect(async () => {
    await axios.get(`${LINK.API}/finishTransaction`)
      .then(function (res) {
        setTxs(res.data)
      })
      .catch(function (err) {
        console.log(err);
      })


  }, [])
  
  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
           <Grid
              item
              xs={12}
            >
              <LatestTransactions data={txs} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

export default Transactions;
