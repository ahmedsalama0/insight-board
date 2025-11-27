import { FormControl, FormLabel, TextField } from '@mui/material';
import { IFormInputTexProps } from '../models/types.model';
import { Controller } from 'react-hook-form';

export const FormInputText = ({
  name,
  control,
  id,
  label,
  placeholder,
}: IFormInputTexProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => {
          return (
            <TextField
              autoComplete={name}
              id={id}
              fullWidth
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              error={!!error}
              color={!!error ? 'error' : 'primary'}
              helperText={error ? error.message : null}
            />
          );
        }}
      />
    </FormControl>
  );
};
