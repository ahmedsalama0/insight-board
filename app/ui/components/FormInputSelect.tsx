import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function FormInputSelect({
  title,
  options,
  name,
}: {
  title: string;
  options: string[];
  name: string;
}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, marginBottom: '10px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {options.map((option, i) => {
            return (
              <MenuItem key={i} value={i}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
