import { FormControl, FormLabel, TextField } from '@mui/material';
import { IFormInputTexProps } from '../models/types.model';
import { Controller } from 'react-hook-form';

export const FormInputText = ({
  name,
  control,
  id,
  label,
  placeholder,
  isEmail,
}: IFormInputTexProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
          pattern: isEmail
            ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            : /[a-zA-Z0-9]/,
        }}
        render={({
          field: { onChange, value },
          fieldState: { error, invalid },
          formState,
        }) => {
          return (
            <TextField
              autoComplete={name}
              id={id}
              fullWidth
              //value={value}
              onChange={() => {
                onChange();
                console.log(error);
                console.log(invalid);
                console.log(formState);
              }}
              placeholder={placeholder}
              error={!!error}
              color={!!error ? 'error' : 'primary'}
              //helperText="dddddddd"
              helperText={error ? error.message : null}
            />
          );
        }}
      />
    </FormControl>
  );
};
