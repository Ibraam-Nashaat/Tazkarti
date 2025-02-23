import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography'; // Import Typography component
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in by checking the presence of the accessToken
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role'); // Get the role from localStorage
  const isLoggedIn = Boolean(accessToken);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/');
    setAnchorEl(null);
  };

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
            padding: '0 20px',
          }}
        >
          {/* Left side: TICKETY text */}
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginLeft: '60px',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '2px',
            }}
          >
            TICKETY
          </div>

          {/* Right side: Conditionally rendered based on login status */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* "Matches" Text */}
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                cursor: 'pointer',
                marginRight: '30px',
              }}
              onClick={() => navigate('/viewmatch')} // Navigate to match page
            >
              Matches
            </Typography>

            {/* "Users" Text - Show only if the role is admin */}
            {role === 'ADMIN' && (
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  marginRight: '30px',
                }}
                onClick={() => navigate('/users')} // Navigate to users page
              >
                Users
              </Typography>
            )}
            {role === 'MANAGER' && (
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  marginRight: '30px',
                }}
                onClick={() => navigate('/addmatch')} // Navigate to users page
              >
                Add Match
              </Typography>
            )}
            {role === 'MANAGER' && (
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  marginRight: '30px',
                }}
                onClick={() => navigate('/addStadium')} // Navigate to users page
              >
                Add Stadium
              </Typography>
            )}
            {role === 'FAN' && (
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  marginRight: '30px',
                }}
                onClick={() => navigate('/tickets')} // Navigate to users page
              >
                Tickets
              </Typography>
            )}

            {/* User Account Circle - Show only if logged in */}
            {isLoggedIn ? (
              <>
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
                  {role == 'FAN' && (
                    <MenuItem onClick={() => navigate('/profile')}>
                      Edit Profile
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
              </>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
