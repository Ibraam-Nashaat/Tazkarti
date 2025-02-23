import API_BASE_URL from '../config'; // Import the base URL from the config file

class AdminService {
  async getAllUsers() {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
    const response = await fetch(`${API_BASE_URL}/admins/${userId}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      const firstError = Object.entries(errorData)[0];
      throw new Error(
        firstError ? `${firstError[1]}` : 'Something went wrong!'
      );
    }

    const data = await response.json();
    const filteredData = data.filter((user) => user.role !== 'ADMIN');

    return filteredData;
  }
  async changeAccountStatus(status, userId) {
    const adminId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
    const response = await fetch(
      `${API_BASE_URL}/admins/${adminId}/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activateUserAccount: status }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      const firstError = Object.entries(errorData)[0];
      throw new Error(
        firstError ? `${firstError[1]}` : 'Something went wrong!'
      );
    }
    const data = await response.json();
    return data;
  }

  async removeUser(userId){
    const adminId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
    const response = await fetch(
      `${API_BASE_URL}/admins/${adminId}/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      const firstError = Object.entries(errorData)[0];
      throw new Error(
        firstError ? `${firstError[1]}` : 'Something went wrong!'
      );
    }
    const data = await response.json();
    return data;
  }
}

export default AdminService;
