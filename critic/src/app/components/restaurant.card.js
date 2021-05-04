import React from 'react';
import styled from 'styled-components';

const StyledRestaurantCard = styled.div`
  
`;


function RestaurantCard({restaurant}) {
    return (
        <StyledRestaurantCard>
            {JSON.stringify(restaurant)}
        </StyledRestaurantCard>
    );
}

export default RestaurantCard;