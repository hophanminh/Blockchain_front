import { Helmet } from 'react-helmet';
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestBlocks from '../components/block/LatestBlocks';
import { LINK } from '../constant/constant'
import axios from 'axios';

const Dashboard = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(async () => {
    await axios.get(`${LINK.API}/blocks`)
      .then(function (res) {
        setBlocks(res.data)
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
              <LatestBlocks data={blocks} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

export default Dashboard;
