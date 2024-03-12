import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getUserDetails = async (auth_token) => {
  const response = await axios.get(`${ASP_API_URL}/api/current_customer`,{
    headers: {
      Authorization: auth_token,
    }});
  return response.data;
};

export const getCategories2 = async () =>{
  const response = await axios.get(`${ASP_API_URL}/api/brand/categories`)
  if(response.data) return response.data;
}