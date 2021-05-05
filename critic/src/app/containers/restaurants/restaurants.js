import { Button } from '@material-ui/core';
import RestaurantCard from 'app/components/restaurant.card';
import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import RestaurantsHeader from './restaurants.header';

const StyledRestaurantsContainer = styled.div`
  button{
      margin: 16px 0;
  }
`;

function RestaurantsContainer(props) {
    const [filter, setFilter] = useState({name: "", rating: 0, page: 0})
    const {state, dispatch} = useContext(CriticStore);
    const {restaurants, restaurantsHaveMoreResults} = state;
    const history = useHistory()

    const loadMore = () => setFilter({...filter, page: filter.page + 1})
    const goToReviews = (id) => history.push(`/restaurants/${id}`)

    useEffect( ()=> {
        apiService.getRestaurants(filter)
                  .then( restaurants => {
                     if (filter.page > 0) 
                        dispatch(CriticDispatchers.appendRestaurants(restaurants))
                     else
                        dispatch(CriticDispatchers.setRestaurants(restaurants))
                  })
    }, [filter])

    return (
        <StyledRestaurantsContainer>
            <RestaurantsHeader filter={filter} onFilterChanged={setFilter} />
            {restaurants.map( restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} onReviewClick={goToReviews}/>
            ))}
            {restaurantsHaveMoreResults &&
                <Button variant="outlined" color="secondary" onClick={loadMore}>LOAD MORE</Button>
            }
        </StyledRestaurantsContainer>
    );
}

export default RestaurantsContainer;