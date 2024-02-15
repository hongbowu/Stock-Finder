import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Typography, Container, Button, Grid, Paper, CssBaseline } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_STOCKS } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import StockCard from '../components/stock-card';
import { useStockContext } from '../utils/stockContext';
import { ME, GET_PRICES } from '../utils/queries';
import LogoutButton from '../components/logout';
// import StockList from '../components/stock-list';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Profile = () => {
  const navigate = useNavigate(); 
  const { loading, data } = useQuery(ME);
  const { data: priceData } = useQuery(GET_PRICES);

  const user = data?.me || {};
  const prices = priceData ? JSON.parse(priceData?.getPrices) : {};
  console.log('prices', prices)

  console.log('user', user)



  const handleSearch = () => {
    navigate('/search');
  };



  if (loading) return <Typography>Loading...</Typography>;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
 
      <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        My Portfolio
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        {/* <Typography variant="h4" component="h2">
          Total Portfolio Value: ${calculateTotalValue().toLocaleString()}
        </Typography> */}
        <Button variant="outlined" onClick={handleSearch}>
          Search Stocks
        </Button>
      </Box>
      <Grid container spacing={2}>
        {/* Iterate over user's stocks and render a StockCard for each stock */}
        {user && prices && user.stocks?.length > 0 && user.stocks.map((stock, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {/* Render StockCard component with data from user's stocks */}
            <StockCard stock={stock} price={prices[stock.stock.ticker]}/>
          </Grid>
        ))}
      </Grid>
    </Container>

      <Footer />
    </ThemeProvider>
  );
};

export default Profile;

