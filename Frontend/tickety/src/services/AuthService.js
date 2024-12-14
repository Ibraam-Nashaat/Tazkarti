import API_BASE_URL from '../config'; // Import the base URL from the config file

class AuthService {
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
        throw new Error(
          errorData.message || 'An error occurred during sign up'
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
