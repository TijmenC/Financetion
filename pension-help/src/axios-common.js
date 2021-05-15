import axios from 'axios';

export default axios.create({
  baseURL: "https://localhost:44309/api/saving",
  headers: {
    "Content-type": "application/json"
}
});