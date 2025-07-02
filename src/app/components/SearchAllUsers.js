import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Divider
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from "../lib/axios"
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: '#1e1e1e',
  color: 'white',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#444',
    },
    '&:hover fieldset': {
      borderColor: '#90caf9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#90caf9',
    },
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: '#ccc',
  },
  '& label.Mui-focused': {
    color: '#90caf9',
  },
};

const UserPopupModal = ({ open, onClose,  onAddUser,selectedPlatform,watchlist,watchlistUpdate }) => {
  const [showAddFields, setShowAddFields] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newUserLink, setNewUserLink] = useState('');
  const [search, setSearch] = useState('');
  const [users,setUsers]=useState([])
const searchUserInList=async()=>{
    try{
        const response=await axios.post("/searchUserInList",{username:search})
        if(response.status==200){
            console.log(response.data)
            setUsers(response.data.result)
            if (response.data.result.length === 0) {
  alert("No user found. Please add the user profile link and username to master");
}

        }
    }
    catch(e){
        console.log(e)
    }

}
const addWatchedUser=async(username,userid)=>{
    selectedPlatform=selectedPlatform.value
        try{
            let word = ""

            if (selectedPlatform == "INSTAGRAM") {
            word = "Instagram"
            }
            else if (selectedPlatform == "TWITTER") {
            word = "Twitter"
            }
            else if (selectedPlatform == "SNAPCHAT") {
            word = "Snapchat"
            }
            else if (selectedPlatform == "FACEBOOK") {
            word = "Fb"
            }
            else if (selectedPlatform == "WHATSAPP") {
            word = "whatsapp"
            }
            else if (selectedPlatform == "TELEGRAM") {
            word = "telegram"
            }
                    const response=await axios.post(`/addWatchedUser${word}`,{username:username,userid:userid})
            
            if(response.status==200){
                alert("user added to watchlist")
            }
            
        }
        catch(error){
            if (error.response && error.response.status === 403) {
                alert(error.response.data.data);
            }
            // console.log(e)
        }
    }

  const handleSubmit = () => {
    if (newUsername && newUserLink) {
      onAddUser(newUsername,  newUserLink);
      setShowAddFields(false);
      setNewUsername('');
      setNewUserLink('');
    }
  };

//   const filteredUsers = users.filter(user =>
//     user.toLowerCase().includes(search.toLowerCase())
//   );

  return (
    <Modal open={open} onClose={()=>{onClose(),setSearch(""),setUsers([])}}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Select User
        </Typography>

        {/* 🔍 Search Bar */}
<Box display="flex" alignItems="center" gap={1} mb={2}>
  <TextField
    variant="outlined"
    placeholder="Search user"
    size="small"
    fullWidth
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={textFieldStyle}
  />
  <Button
    variant="outlined"
    onClick={() => searchUserInList(search)}
    sx={{
      color: 'skyblue',
      borderColor: 'skyblue',
      '&:hover': { borderColor: '#90caf9', color: '#90caf9' },
      height: '40px',
      minWidth: '80px',
      textTransform: 'none',
    }}
  >
    Search
  </Button>
</Box>

        <List>
          <Box sx={{ maxHeight: '300px', overflowY: 'auto', pr: 1 }}>
  {users.map((user, index) => (
    <ListItem key={index} divider sx={{ borderColor: '#333' }}>
      <ListItemText
        primary={user.username}
        primaryTypographyProps={{ color: 'white' }}
      />
      <IconButton
        edge="end"
        onClick={async() => {await addWatchedUser(user.username, user.profile_url),await watchlistUpdate()}}
      >
        {!watchlist.some(userx=>userx.username==user.username) &&
        <PersonAddIcon sx={{ color: '#90caf9' }} />}
      </IconButton>
    </ListItem>
  ))}
</Box>

          <Divider sx={{ my: 1, borderColor: '#333' }} />

          <ListItem button onClick={() => setShowAddFields(!showAddFields)}>
            <ListItemText primary="➕ Add to Master"style={{cursor:"pointer"}} sx={{ color: 'skyblue' }} />
          </ListItem>

          {showAddFields && (
            <Box sx={{ mt: 2, px: 1.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                variant="outlined"
                fullWidth
                label="Username"
                size="small"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                variant="outlined"
                fullWidth
                label="Profile Link"
                size="small"
                value={newUserLink}
                onChange={(e) => setNewUserLink(e.target.value)}
                sx={textFieldStyle}
              />
              <Button
  variant="contained"
  onClick={handleSubmit}
  disabled={!newUsername || !newUserLink}
  style={{cursor:"pointer"}}
  sx={{
    bgcolor: '#388e3c',
    color: 'white',
    '&:hover': { bgcolor: '#2e7d32' },
    '&.Mui-disabled': {
      bgcolor: '#555', // dark disabled color
      color: '#aaa',
    },
  }}
>
  Submit
</Button>
            </Box>
          )}
        </List>
      </Box>
    </Modal>
  );
};

export default UserPopupModal;
