import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getProductDetails = async (id) => {
  const response = await axios.get(`${ASP_API_URL}/api/brand/products/${id}`);
  return response.data;
};

export const getBrandproductlist = async (
  brandSlug,
  page,
  limit,
  minPrice,
  maxPrice,
  collectionSlug
) => {
  const min_price = minPrice > 0 ? `&min_price=${minPrice}` : "";
  const max_price = maxPrice > 0 ? `&max_price=${maxPrice}` : "";
  const collection_slug = collectionSlug
    ? `&collection_slug=${collectionSlug}`
    : "";
  const brand_slug = brandSlug ? `brand_slug=${brandSlug}` : "";
  const response = await axios.get(
    `${ASP_API_URL}/api/brand/product_parent_list?${brand_slug}${collection_slug}${min_price}${max_price}&page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getBrandProfile = async (id) => {
  const response = await axios.get(`${ASP_API_URL}/api/brand/${id}/brand_json`);
  return response.data;
};

export const getReviews = async (id, page, limit) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/${id}/get_reviews?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getcategoryLevels = async (is_search, key, slug, parentCatSlug) => {
  const perams =
    is_search === "true" ? `search=${key}` : (parentCatSlug ? "" : `sub_category_id=${key}`);
  const slugValue = slug ? `&brand_slug=${slug}` : "";
  const parentSlug = parentCatSlug ? `category_id=${parentCatSlug}` : "";
  const response = await axios.get(
    `${ASP_API_URL}/api/brand/category_levels?${perams}${slugValue}${parentSlug}`
  );
  return response.data;
}; 

export const getCollectionCategories = async (slug, selectedBrands) => {
  const collectionSlug = slug ? `collection_slug=${slug}` : "";
  const brands = selectedBrands ? `&brand_id=${selectedBrands}` : "";
  const response = await axios.get(`${ASP_API_URL}/api/brand/collection_categories?${collectionSlug}${brands}`)
  return response.data;
};

export const getCollectionsProduct = async (slug, id, minPrice, maxPrice, brandId, page, limit) => {
  const min_price = minPrice > 0 ? `&min_price=${minPrice}` : "";
  const max_price = maxPrice > 0 ? `&max_price=${maxPrice}` : "";
  const collectionSlug = slug ? `collection_slug=${slug}` : "";
  const sub_category_id = id?.length>0 ? `&sub_category_id=${id}` : "";
  const brandIdArray = brandId?.length>0 ? `&brand_id=${brandId}` : "";
  const response = await axios.get(
    `${ASP_API_URL}/api/brand/collection_products?${collectionSlug}${sub_category_id}${min_price}${max_price}${brandIdArray}&page=${page}&limit=${limit}`
  );
  return response.data;
};

// write Review
export const createReviews = async (auth_token, details) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/review/create`,
    details,
    { headers: { Authorization: auth_token } }
  );
  return response.data;
};

// getCollections
export const getCollections = async () => {
  const response = await axios.get(`${ASP_API_URL}/api/collections`);
  return response.data.data;
};

// get collection brands based on sub category id
export const getBrandsBasedOnSubCategoryId = async (slug, subCategoryId) => {
  const collectionSlug = slug ? `collection_slug=${slug}` : "";
  const sub_category_id = subCategoryId ? `&sub_category_id=${subCategoryId}` : "";
  const response = await axios.get(`${ASP_API_URL}/api/brand/collection_brands?${collectionSlug}${sub_category_id}`);
  return response.data.data
}