import API_BASE_URL from '../config'; // Import the base URL from the config file

class ManagerService {
  async addStadium(stadiumDetails) {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    try {
      const response = await fetch(
        `${API_BASE_URL}/managers/${userId}/stadiums`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stadiumDetails),
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
}
export default ManagerService;
