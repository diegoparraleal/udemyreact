import { Button } from '@material-ui/core';
import RestaurantCard from 'app/components/restaurant.card';
import RestaurantEditable from 'app/components/restaurant.editable';
import { apiService } from 'app/services/apiService';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import RestaurantsHeader from './restaurants.header';
import RestaurantsHeaderOwner from './restaurants.header.owner';

const StyledRestaurantsContainer = styled.div`
  button{
      margin: 16px 0;
  }
`;

function RestaurantsContainer() {
    const {state, dispatch} = useContext(CriticStore);
    const {appUser, restaurants, restaurantsHaveMoreResults} = state;
    const isOwner = appUser?.role === "owner"
    const [filter, setFilter] = useState({name: "", rating: 0, page: 0, ownerId: isOwner ? appUser.id : undefined})
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
    }, [filter, dispatch])
    
    // Add restaurant logic
    const [addingRestaurant, setAddingRestaurant] = useState(false);
    const addRestaurant = () => setAddingRestaurant(true)
    const cancelRestaurantAddition = () => setAddingRestaurant(false)
    const performAddRestaurant = (restaurant) => {
        restaurant.owner = appUser.id;
        apiService.addRestaurant(restaurant)
                  .then(() => {
                      setAddingRestaurant(false)
                      setFilter({...filter, page: 0})
                  })
    }

    // Edit restaurant logic
    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const editRestaurant = (restaurant) => setEditingRestaurant(restaurant)
    const cancelRestaurantEdition = () => setEditingRestaurant(null)
    const performEditRestaurant = (restaurant) => {
        apiService.editRestaurant(restaurant)
                  .then(() => {
                      setEditingRestaurant(false)
                      setFilter({...filter, page: 0})
                  })
    }

    return (
        <StyledRestaurantsContainer>
            {addingRestaurant && 
                <RestaurantEditable title="Add Restaurant" confirmButton="Add" 
                                    onCancel={cancelRestaurantAddition} onConfirm={performAddRestaurant} />
            }
            {editingRestaurant && 
                <RestaurantEditable title="Edit Restaurant" confirmButton="Edit" restaurant={editingRestaurant}
                                    onCancel={cancelRestaurantEdition} onConfirm={performEditRestaurant} />
            }
            {isOwner &&
                <RestaurantsHeaderOwner onAddRestaurantClick={addRestaurant}/>
            }
            <RestaurantsHeader filter={filter} onFilterChanged={setFilter} />
            {restaurants.map( restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} showEdit={isOwner} 
                                onReviewClick={goToReviews} onEditClick={editRestaurant}/>
            ))}
            {restaurantsHaveMoreResults &&
                <Button variant="outlined" color="secondary" onClick={loadMore}>LOAD MORE</Button>
            }
        </StyledRestaurantsContainer>
    );
}

export default RestaurantsContainer;