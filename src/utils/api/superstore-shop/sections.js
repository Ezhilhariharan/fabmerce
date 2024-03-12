import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getNewArrivalList = async () => {
  const response = await axios.get(`${ASP_API_URL}/api/brand/latest_products`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${ASP_API_URL}/api/brand/categories`);
  return response.data;
};
export const getMoreItems = async (limit, page) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/brand/product_parent_list?limit=${limit}&page=${page}`
  );
  return response.data;
};
export const getServiceList = async () => {
  const response = await axios.get("/api/super-store/get-service-list");
  return response.data;
};

export const getBrands = async (key, page, limit) => {
  const search = key ? `&search=${key}`:''
  const pageLimit = limit ? limit : 200;
  const pageNumber = page ? `&page=${page}` : "";
  const response = await axios.get(`${ASP_API_URL}/api/brand/brands?limit=${pageLimit}${search}${pageNumber}`);
  return response.data.data;
};

export const getTrendingProduct = async () => {
  const response = await axios.get(
    `${ASP_API_URL}/api/brand/product_parent_list?is_trending=true`
  );
  return response.data;
};

export const getBanners = async () => {
  const response = await axios.get(`${ASP_API_URL}/api/promotions`);
  return response?.data?.data;
};
