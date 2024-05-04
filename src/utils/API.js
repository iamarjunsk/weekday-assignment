import axios from "axios";

// Create an instance of axios with custom configuration
const instance = axios.create({
  baseURL: 'https://api.weekday.technology/adhoc/',
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', 
    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' 
    // Add any other headers you need here
  }
});

export default instance