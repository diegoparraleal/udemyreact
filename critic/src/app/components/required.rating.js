import React from 'react';
import styled from 'styled-components';
import { Controller } from "react-hook-form";
import ErrorMessage from './error.message';
import { Rating } from '@material-ui/lab';

const StyledRequiredRating = styled.div`
  
`;

function RequiredRating({control, name, errors, defaultValue, validationMessage}) {
    return (
        <StyledRequiredRating>
            <Controller name={name} control={control} defaultValue={defaultValue}
                        rules={{ min: 0.5 }}
                        render={({ field }) => (<Rating name={name} size="large" precision={0.5} {...field} />)}
            />
            <ErrorMessage errors={errors} name={name} type="min">{validationMessage}</ErrorMessage>
        </StyledRequiredRating>
    );
}

export default RequiredRating;