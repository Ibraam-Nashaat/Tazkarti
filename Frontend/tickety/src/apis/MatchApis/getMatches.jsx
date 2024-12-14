import { API_URL } from "../../constants";
const lnk =API_URL+"matches";
const apiGetMatches = async () => {
    try {
      const response = await fetch(lnk, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
      const responseData = await response.json();
      console.log(responseData);
        return responseData;
    } catch (error) {
      console.error("There was a problem with the fetch operation in getMatches api: ", error);
    }
  };
  
  export  default apiGetMatches ;












  