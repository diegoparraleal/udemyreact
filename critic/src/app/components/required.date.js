import React from 'react';
import styled from 'styled-components';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Controller } from "react-hook-form";
import ErrorMessage from './error.message';

const StyledRequiredDate = styled.div`
  
`;

function RequiredDate({errors, name, control, defaultValue, validationMessage}) {
    return (
        <StyledRequiredDate>
            <Controller name={name} control={control} defaultValue={defaultValue}
                        rules={{ required: true }}
                        render={({ field }) => (<KeyboardDatePicker format="yyyy/MM/dd" value={field.value} onChange={field.onChange} />)}
            />
            <ErrorMessage errors={errors} name={name} type="required">{validationMessage}</ErrorMessage>
        </StyledRequiredDate>
    );
}

export default RequiredDate;