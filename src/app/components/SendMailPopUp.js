import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60vw",
  bgcolor: '#121212',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  color: '#ffffff',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const reportReasons = [
  "It's spam",
  "Bullying or unwanted contact",
  "Suicide, self-injury or eating disorders",
  "Violence, hate or exploitation",
  "Nudity or sexual activity",
  "Scam or fraud",
  "False information",
  "Copyright"
];

export default function ReportModal({ isOpen, onClose, onSubmit }) {
  const [searchText, setSearchText] = useState('');
  const [contentType, setContentType] = useState('post');
  const [selectedReason, setSelectedReason] = useState('');

  const handleSubmit = () => {
    onSubmit(
      searchText,
      contentType,
       selectedReason
    );
    setSearchText('');
    setSelectedReason('');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="report-modal-title"
      aria-describedby="report-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="report-modal-title" variant="h6" sx={{ color: '#fff' }}>
            Report Content
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

        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
          <FormLabel component="legend" sx={{ color: '#fff' }}>Content Type</FormLabel>
          <RadioGroup
            row
            aria-label="content-type"
            name="content-type"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <FormControlLabel
              value="post"
              control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#1e88e5' } }} />}
              label="Post"
              sx={{ color: '#fff' }}
            />
            <FormControlLabel
              value="page"
              control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#1e88e5' } }} />}
              label="Page"
              sx={{ color: '#fff' }}
            />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2, bgcolor: '#333' }} />

        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend" sx={{ color: '#fff' }}>Report Reason</FormLabel>
          <RadioGroup
            aria-label="report-reason"
            name="report-reason"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          >
            {reportReasons.map((reason) => (
              <FormControlLabel
                key={reason}
                value={reason}
                control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#1e88e5' } }} />}
                label={reason}
                sx={{ color: '#fff' }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            onClick={() => {
              onClose();
              setSearchText('');
              setSelectedReason('');
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
            disabled={!searchText || !selectedReason}
          >
            Submit Report
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}