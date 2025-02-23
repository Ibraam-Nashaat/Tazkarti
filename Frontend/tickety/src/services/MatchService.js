import API_BASE_URL from '../config'; // Import the base URL from the config file

class MatchService {
  async getAllTeams() {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
    console.log('hello');
    const response = await fetch(`${API_BASE_URL}/managers/${userId}/teams`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      const firstError = Object.entries(errorData)[0];
      throw new Error(
        firstError ? `${firstError[1]}` : 'Something went wrong!'
      );
    }

    const data = await response.json();
    return data;
  }

  async getAllStadiums() {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    const response = await fetch(
      `${API_BASE_URL}/managers/${userId}/stadiums`,
      {
        method: 'GET',
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

  async addMatch(matchDetails) {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    try {
      const response = await fetch(
        `${API_BASE_URL}/managers/${userId}/matches`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(matchDetails),
        }
      );

      if (!response.ok) {
        // Handle non-2xx responses (e.g., 400, 500)
        const errorData = await response.json();
        const firstError = Object.entries(errorData)[0];
        throw new Error(
          firstError ? `${firstError[1]}` : 'Something went wrong!'
        );
      }

      // If the response is successful, return the response data
      const result = await response.json();
      return result;
    } catch (error) {
      throw error; // Throw the error to be handled in the component
    }
  }
  async getMatchById(matchId) {
    const userId = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
    console.log('hello');
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      const firstError = Object.entries(errorData)[0];
      throw new Error(
        firstError ? `${firstError[1]}` : 'Something went wrong!'
      );
    }

    const data = await response.json();
    return data;
  }
}
export default MatchService;
