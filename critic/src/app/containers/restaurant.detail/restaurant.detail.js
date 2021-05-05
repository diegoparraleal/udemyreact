import RestaurantCard from 'app/components/restaurant.card';
import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
const StyledRestaurantDetailContainer = styled.div`
  
`;

function RestaurantDetailContainer(props) {
    const {id} = useParams()
    const {state, dispatch} = useContext(CriticStore)
    const {restaurantWithDetails} = state

    useEffect( () => {
        apiService.getRestaurant(id)
                  .then( (restaurantWithDetails) => dispatch(CriticDispatchers.setRestaurant(restaurantWithDetails)))
    }, [id])

    if (restaurantWithDetails === null) return (<>...</>)
    const {restaurant} = restaurantWithDetails

    return (
        <StyledRestaurantDetailContainer>
            <RestaurantCard restaurant={restaurant} showReviews={false}/>
        </StyledRestaurantDetailContainer>
    );
}

export default RestaurantDetailContainer;