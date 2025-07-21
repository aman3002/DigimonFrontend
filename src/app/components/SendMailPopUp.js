import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#121212',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  color: '#ffffff',
};

export default function SendMailPopupModal({ isOpen, onClose, onSubmit }) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = () => {
    onSubmit(searchText);
    setSearchText('');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="search-modal-title" variant="h6" sx={{ color: '#fff' }}>
            Reporter
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          label="Enter Link"
          variant="outlined"
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            style: {
              color: '#fff',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#bbb',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#555',
              },
              '&:hover fieldset': {
                borderColor: '#888',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#aaa',
              },
            },
          }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            onClick={() => {
              onClose();
              setSearchText('');
            }}
            sx={{ mr: 1, color: '#fff', borderColor: '#555' }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ backgroundColor: '#1e88e5' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
