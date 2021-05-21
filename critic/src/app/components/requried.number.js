import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error.message';

function RequiredNumber({control, errors, defaultValue, validationMessage, name, label, adornment = "$"}) {
    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={{ required: `${label} is required` }}
                render={({field}) => (
                    <FormControl fullWidth>
                        <InputLabel >{label}</InputLabel>
                        <Input {...field} type="number"
                                startAdornment={ adornment != null &&  <InputAdornment position="start">{adornment}</InputAdornment>}
                        />
                    </FormControl>
                )} />
            <ErrorMessage errors={errors} name={name} type="required">{validationMessage}</ErrorMessage>
        </>
    );
}

export default RequiredNumber;