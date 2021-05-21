import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { Controller } from 'react-hook-form';
import usePlacesAutocomplete from 'use-places-autocomplete';
import ErrorMessage from './error.message';

function RequiredGoogleAutocomplete({control, errors, defaultValue, name, label, options, maxLength, validationMessage}) {
    const {suggestions: { data }, setValue} = usePlacesAutocomplete({ requestOptions: options, debounce: 300})
    const handleInput = (e, onChange) => {
        setValue(e.target.value)
        onChange(e.target.value)
    }
    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={{ required: `${label} is required` }}
                render={({ field }) => (
                    <FormControl fullWidth>
                        <Autocomplete freeSolo
                            value={field.value}
                            options={data.map(({structured_formatting: { main_text }}) => main_text)}             
                            renderInput={(params) => (
                                <TextField {...params} type="search"fullWidth name={name} label={label} 
                                           inputProps={{ ...params.inputProps, maxLength: maxLength }}
                                           onChange={(e) => handleInput(e, field.onChange)}/>
                            )}
                        />
                    </FormControl>
                )} />
            <ErrorMessage errors={errors} name={name} type="required">{validationMessage}</ErrorMessage>
        </>
    );
}

export default RequiredGoogleAutocomplete;
