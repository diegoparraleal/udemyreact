import React from 'react';
import styled from 'styled-components';
import { Controller } from "react-hook-form";
import ErrorMessage from './error.message';
import { TextField } from '@material-ui/core';

const StyledRequiredText = styled.div`
  
`;

function RequiredText({control, name, label, maxLength, errors, defaultValue, validationMessage, pattern = null, patternMessage = ""}) {
    const rules = { 
        required: `${label} is required`,
        pattern: pattern ? { value: pattern, message: patternMessage} : undefined
    }

    return (
        <StyledRequiredText>
            <Controller name={name} control={control} defaultValue={defaultValue}
                        rules={rules}
                        render={({ field }) => (<TextField {...field} fullWidth multiline label={label} inputProps={{ maxLength: {maxLength} }}/> )}
            />
            {errors[name]?.type === "required" && 
                <ErrorMessage errors={errors} name={name} type="required">{validationMessage}</ErrorMessage>
            }
            {errors[name]?.type === "pattern" && 
                <ErrorMessage errors={errors} name={name} type="pattern">{patternMessage}</ErrorMessage>
            }
        </StyledRequiredText>
    );
}

export default RequiredText;