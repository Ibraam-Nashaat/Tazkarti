import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import NavBar from '../components/Navbar';
import AdminService from '../services/AdminService';

const UserListPage = () => {
  const adminService = new AdminService();
  const [users, setUsers] = useState([]); // State for storing users
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await adminService.getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleActivate = async (user, event) => {
    event.stopPropagation(); // Prevent event propagation
    try {
      const response = await adminService.changeAccountStatus(
        true,
        user.userId
      );
      setSelectedUser({ ...selectedUser, accountStatus: 'ACTIVE' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeactivate = async (user, event) => {
    event.stopPropagation(); // Prevent event propagation
    try {
      const response = await adminService.changeAccountStatus(
        false,
        user.userId
      );
      setSelectedUser({ ...selectedUser, accountStatus: 'INACTIVE' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveUser = async (user, event) => {
    event.stopPropagation(); // Prevent event propagation
    try {
      const response = await adminService.removeUser(user.userId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <NavBar />

      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 80px)', // Adjust for root padding
          overflow: 'hidden', // Prevent vertical scrolling
          marginTop: '65px',
        }}
      >
        {/* Left side: User list */}
        <Box
          sx={{
            flex: 0.6, // Reduced width of the left side
            overflowY: 'auto', // Make only the user list scrollable
            maxHeight: '100%',
            borderRight: '2px solid #ddd',
            paddingTop: '20px',
          }}
        >
          {users.map((user) => (
            <Card
              key={user.userId}
              sx={{
                margin: '8px',
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: 0,
                }}
              >
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {user.username}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleUserClick(user)}
                  sx={{
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#45a049',
                    },
                  }}
                >
                  Show Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#ddd' }} />

        {/* Right side: User details */}
        <Box
          sx={{
            flex: 2.2, // Increased width of the right side
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {selectedUser ? (
            <Card
              sx={{
                padding: '80px',
                border: 'none',
                maxWidth: '900px', // Increased
                width: '100%',
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  {selectedUser.firstName} {selectedUser.lastName}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr', // Two columns
                    gap: '16px', // Spacing between items
                    fontSize: '1.2rem', // Increased font size
                    textAlign: 'left', // Left-align all content
                    marginLeft: '100px',
                  }}
                >
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>Email:</strong> {selectedUser.email}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>Username:</strong> {selectedUser.username}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>Gender:</strong> {selectedUser.gender}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>City:</strong> {selectedUser.city}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>Address:</strong> {selectedUser.address}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>Birth Date:</strong> {selectedUser.birthDate}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>Role:</strong> {selectedUser.role}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    <strong>Account Status:</strong>{' '}
                    {selectedUser.accountStatus}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '50px',
                    gap: '80px',
                  }}
                >
                  {selectedUser.accountStatus === 'PENDING' ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={(event) => handleActivate(selectedUser, event)}
                      >
                        Activate
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={(event) =>
                          handleDeactivate(selectedUser, event)
                        }
                      >
                        Deactivate
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(event) => handleRemoveUser(selectedUser, event)}
                    >
                      Remove User
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Select a user to view details
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserListPage;
