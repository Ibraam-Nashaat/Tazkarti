import API_BASE_URL from '../config'; // Import the base URL from the config file

class FanService {
  async cancelReservation(ticketId) {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    try {
      const response = await fetch(
        `${API_BASE_URL}/fans/${userId}/tickets/${ticketId}`,
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
      const result = await response.json();
      return result;
    } catch (error) {
      throw error; // Throw the error to be handled in the component
    }
  }
  async editProfileData(profileData) {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    try {
      const response = await fetch(`${API_BASE_URL}/fans/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const firstError = Object.entries(errorData)[0];
        throw new Error(
          firstError ? `${firstError[1]}` : 'Something went wrong!'
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error; // Throw the error to be handled in the component
    }
  }
  async getProfileData() {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    try {
      const response = await fetch(`${API_BASE_URL}/fans/${userId}`, {
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
      const result = await response.json();
      return result;
    } catch (error) {
      throw error; // Throw the error to be handled in the component
    }
  }
  async getTickets() {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    try {
      const response = await fetch(`${API_BASE_URL}/fans/${userId}/tickets`, {
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
      const result = await response.json();
      return result;
    } catch (error) {
      throw error; // Throw the error to be handled in the component
    }
  }
}
export default FanService;
