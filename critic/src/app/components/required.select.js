import { Select } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error.message';

function RequiredSelect({control, errors, defaultValue, name, label, children, validationMessage}) {
    const rules = { 
        required: `${label} is required`
    }

    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={rules}
                render={({field}) => (
                    <Select {...field} displayEmpty>
                        {children}
                    </Select>
                )} />
            <ErrorMessage errors={errors} name={name} type="required">{validationMessage}</ErrorMessage>
        </>
    );
}

export default RequiredSelect;