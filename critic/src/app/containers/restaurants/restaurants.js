import RestaurantCard from 'app/components/restaurant.card';
import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import RestaurantsHeader from './restaurants.header';

const StyledRstaurantsContainer = styled.div`
  
`;

function RestaurantsContainer(props) {
    const [filter, setFilter] = useState({name: null, rating: 0, page: 0})
    const {state, dispatch} = useContext(CriticStore);
    const {restaurants} = state;

    useEffect( ()=> {
        apiService.getRestaurants(filter)
                  .then( restaurants => dispatch(CriticDispatchers.setRestaurants(restaurants)))
    }, [filter])

    return (
        <StyledRstaurantsContainer>
            <RestaurantsHeader filter={filter} onFilterChanged={setFilter} />
            {restaurants.map( restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </StyledRstaurantsContainer>
    );
}

export default RestaurantsContainer;