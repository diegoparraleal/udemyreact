import React from 'react';
import styled from 'styled-components';
import { Controller } from "react-hook-form";
import ErrorMessage from './error.message';
import { TextField } from '@material-ui/core';

const StyledRequiredText = styled.div`
  
`;

function RequiredText({control, name, errors, defaultValue, validationMessage}) {
    return (
        <StyledRequiredText>
            <Controller name={name} control={control} defaultValue={defaultValue}
                        rules={{ required: true }}
                        render={({ field }) => (<TextField {...field} fullWidth multiline label="Please tell us your experience" /> )}
            />
            <ErrorMessage errors={errors} name={name} type="required">{validationMessage}</ErrorMessage>
        </StyledRequiredText>
    );
}

export default RequiredText;