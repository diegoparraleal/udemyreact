import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Rating } from '@material-ui/lab';

const StyledRestaurantsHeader = styled.div`
  height: 64px;
  margin-top: 16px;
  .crt-filter-text-container{
      display: flex;

      .crt-filter-text-field{
        flex-grow: 1;
      }
  }
  h6 {
    font-weight: 300;
  }
`;


function RestaurantsHeader({filter, onFilterChanged}) {

    const filterByName = (event) => { onFilterChanged({...filter, name: event.target.value, page: 0}) }
    const cleanFilter = () => {  onFilterChanged({...filter, name: "", page: 0}) }
    const filterByRating = (event, value) => { onFilterChanged({...filter, rating: value, page: 0}) }

    return (
        <StyledRestaurantsHeader>
            <Grid container>
                <Grid item xs={9} className="crt-filter-text-container">
                    <IconButton color="primary">
                        <SearchIcon/>
                    </IconButton>
                    <TextField label="Type some text to filter out restaurants" value={filter.name} className="crt-filter-text-field" onChange={filterByName}/>
                    <IconButton color="primary" onClick={cleanFilter}>
                        <ClearIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle2">Filter by minimum rating</Typography>
                    <Rating name="rating-restaurants" value={filter.rating} size="large" onChange={filterByRating} />
                </Grid>
            </Grid>
        </StyledRestaurantsHeader>
    );
}

export default RestaurantsHeader;