import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#2e7d32', boxShadow: 'none' }}
      >
        <Toolbar
          sx={{
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px', // Adjust the padding to your needs
          }}
        >
          {/* Left side: TICKETY text */}
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginLeft: '60px',
              fontFamily: 'Arial, sans-serif', // Custom font family (change as needed)
              letterSpacing: '2px', // Add space between letters (adjust the value as needed)
            }}
          >
            TICKETY
          </div>

          {/* Right side: User circle */}
          <div>
            <IconButton
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('userId');
                  localStorage.removeItem('role');
                  navigate('/');
                  setAnchorEl(null);
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
