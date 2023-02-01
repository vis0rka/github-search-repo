import { Box } from 'components/Box';
import Button from 'components/Button';
import { CheckBox } from 'components/form/CheckBox';
import { TextField } from 'components/form/TextField';
import { DownArrowIcon, SearchIcon } from 'components/Icons';
import { Stack } from 'components/Stack';
import { Text } from 'components/Text';
import React from 'react';

export const SearchBar = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems='center'>
      <TextField label="Search by" />
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <Text mr={2}>In:</Text>
          <Stack direction="row">
            <CheckBox label="name" />
            <CheckBox label="description" />
            <CheckBox label="readme" />
          </Stack>
        </Box>
          <Stack direction="row" spacing={4} display="flex" alignItems="center">
            <Button startIcon={<SearchIcon />}>Search</Button>
            <Button variant="outlined">Reset</Button>
          </Stack>
      </Box>
      <Button startIcon={<DownArrowIcon />}>Advanced</Button>
    </Box>
  );
};
