// import React, { useState } from 'react';
// import {
//   Box,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Typography,
//   Paper
// } from '@mui/material';

// const RadioSelector = (prop) => {
//     console.log(prop)

//   return (
//     <Paper
//     //   elevation={3}
//       sx={{
//         bgcolor: prop.mobile?'black':"transparent",
//         color: 'white',
//         p: "5px",
//         borderRadius: 2,
//         // maxWidth: 400,
//         mx: 'auto',
//         paddingTop:1,
//         mt: 0.5
//       }}
//     >
//          <FormControl component="fieldset">
//         <RadioGroup
//           row
//           value={prop.selectedOption}
//           onChange={ ()=>{prop.setSelectedOption(event.target.value)}}
//           name="category"
//         >
//           <FormControlLabel
//             value="watchlist"
//             control={
//               <Radio
//                 sx={{
//                   color: 'white',
//                   '&.Mui-checked': { color: '#90caf9' }
//                 }}
//               />
//             }
//             label={
//               <span style={{ fontSize: '3.5vh', color: 'white' }}>
//                 Watchlist
//               </span>
//             }
//           />

//           <FormControlLabel
//             value="socialmedia"
//             control={
//               <Radio
//                 sx={{
//                   color: 'white',
//                   '&.Mui-checked': { color: '#90caf9' }
//                 }}
//               />
//             }
//             label={
//               <span style={{ fontSize: '3.5vh', color: 'white' }}>
//                 Social Media
//               </span>
//             }
//           />
//         </RadioGroup>
//       </FormControl>
//       {/* <Box mt={2}>
//         <Typography variant="body2" sx={{ color: '#bbb' }}>
//           You selected: <strong>{selectedOption}</strong>
//         </Typography>
//       </Box> */}
//     </Paper>
//   );
// };

// export default RadioSelector;
import React from 'react';
import { Paper, Switch, FormControlLabel, Typography, Box } from '@mui/material';

const RadioSelector = ({ selectedOption, setSelectedOption, mobile }) => {
  const isWatchlist = selectedOption === 'watchlist';

  const handleChange = () => {
    setSelectedOption(isWatchlist ? 'socialmedia' : 'watchlist');
  };

  return (
    <Paper
      sx={{
        bgcolor: mobile ? 'black' : 'transparent',
        color: 'white',
        p: 2,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: mobile ? '100%' : '250px',
      }}
    >
      <Typography sx={{ fontSize: '3.5vh' }}>
        Watchlist 
      </Typography>

      <Switch
        checked={isWatchlist}
        onChange={handleChange}
        color="success"
        sx={{
          '& .MuiSwitch-thumb': {
            backgroundColor: '#fff',
          },
          '& .MuiSwitch-track': {
            backgroundColor: isWatchlist ? '#4caf50' : '#ccc',
            opacity: 1,
          },
        }}
      />
    </Paper>
  );
};

export default RadioSelector;
