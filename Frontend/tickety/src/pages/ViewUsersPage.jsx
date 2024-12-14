import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import NavBar from '../components/Navbar';

const UserListPage = () => {
  const users = [
    {
      userId: 303,
      email: 'admin2@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      username: 'admin2',
      gender: 'Male',
      city: 'New York',
      address: '1234 Main St',
      birthDate: '1990-01-01',
      role: 'MANAGER',
      accountStatus: 'PENDING',
    },
    {
      userId: 304,
      email: 'user1@gmail.com',
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'user1',
      gender: 'Female',
      city: 'Los Angeles',
      address: '5678 Elm St',
      birthDate: '1992-05-12',
      role: 'EMPLOYEE',
      accountStatus: 'ACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
    {
      userId: 305,
      email: 'user2@gmail.com',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'user2',
      gender: 'Male',
      city: 'Chicago',
      address: '9101 Oak St',
      birthDate: '1988-07-22',
      role: 'EMPLOYEE',
      accountStatus: 'INACTIVE',
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleActivate = () => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, accountStatus: 'ACTIVE' });
    }
  };

  const handleDeactivate = () => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, accountStatus: 'INACTIVE' });
    }
  };

  const handleRemoveUser = () => {
    if (selectedUser) {
      alert(`User ${selectedUser.username} removed.`);
      setSelectedUser(null);
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
          }}
        >
          {users.map((user) => (
            <Card
              key={user.userId}
              sx={{
                margin: '8px',
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                padding: '8px',
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
                padding: '20px',
                border: 'none',
                maxWidth: '700px', // Increased width
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
                  <Typography>
                    <strong>Email:</strong> {selectedUser.email}
                  </Typography>
                  <Typography>
                    <strong>Username:</strong> {selectedUser.username}
                  </Typography>
                  <Typography>
                    <strong>Gender:</strong> {selectedUser.gender}
                  </Typography>
                  <Typography>
                    <strong>City:</strong> {selectedUser.city}
                  </Typography>
                  <Typography>
                    <strong>Address:</strong> {selectedUser.address}
                  </Typography>
                  <Typography>
                    <strong>Birth Date:</strong> {selectedUser.birthDate}
                  </Typography>
                  <Typography>
                    <strong>Role:</strong> {selectedUser.role}
                  </Typography>
                  <Typography>
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
                        onClick={handleActivate}
                      >
                        Activate
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={handleDeactivate}
                      >
                        Deactivate
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleRemoveUser}
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
