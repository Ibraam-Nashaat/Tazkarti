import API_BASE_URL from '../config'; // Import the base URL from the config file

class AuthService {
  async signIn(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

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
      // Store JWT and role in localStorage
      localStorage.setItem('accessToken', result.jwt); 
      localStorage.setItem('role', result.role); 
      localStorage.setItem('userID', result.userId);
      return result;
    } catch (error) {
      throw error; // Throw the error to be handled in the component
    }
  }

  async signUp(formData) {
    const apiUrl = `${API_BASE_URL}/auth/signup`; // Use the base URL from the config file

    // Format the date properly to yyyy-mm-dd if needed
    const formattedDate = new Date(formData.dateOfBirth)
      .toISOString()
      .split('T')[0]; // yyyy-mm-dd format

    // Prepare the data to match the API's expected structure
    const data = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      gender: formData.gender,
      city: formData.city,
      address: formData.address,
      birthDate: formattedDate, // Pass the formatted date here
      role: formData.role,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        const firstError = Object.entries(errorData)[0];
        throw new Error(
          firstError ? `${firstError[1]}` : 'Something went wrong!'
        );
      }

      // Return successful response
      const result = await response.json();
      return result;
    } catch (error) {
      // Return error message from backend if available
      throw error;
    }
  }
}

export default AuthService;
