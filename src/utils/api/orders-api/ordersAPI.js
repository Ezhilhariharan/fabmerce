import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getOrders = async (auth_token, page, limit) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/orders_list?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data;
};

export const getOrderStatuses = async (auth_token) => {
  const response = await axios.get(`${ASP_API_URL}/api/order_statuses`, {
    headers: {
      Authorization: auth_token,
    },
  });
  return response.data.data;
};

export const getOrderDetails = async (orderId, auth_token) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/order_details/${orderId}`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data.data;
};

export const createOrder = async (details, auth_token) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/process_order`,
    details,
    { headers: { Authorization: auth_token } }
  );
  return response.data;
};

export const getshippingCharge = async (details, auth_token) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/shipping_charge_session`,
    details,
    { headers: { Authorization: auth_token } }
  );
  return response.data;
};

// strip API

export const stripOrderCreation = async (details, auth_token) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/stripe/checkout_session`,
    details,
    { headers: { Authorization: auth_token } }
  );
  return response.data;
};

// coupon code

export const validateCoupCode = async (
  auth_token,
  order_draft_id,
  coupon_code
) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/coupon_code?order_draft_id=${order_draft_id}&coupon_code=${coupon_code} `,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data;
};

// price_summary
export const getPriceSummary = async (auth_token, reference_id) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/price_summary?reference_id=${reference_id}`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data;
};

// orderDraftAPI

export const orderDraftAPI = async (details, auth_token) => {
  const response = await axios.post(`${ASP_API_URL}/api/order_draft`, details, {
    headers: { Authorization: auth_token },
  });
  return response.data;
};

//delete address
export const deleteAPI = async (id, customer_location_id, auth_token) => {
  const response = await axios.delete(
    `${ASP_API_URL}/api/delete_location/${id?.id}`,
    {
      data: {
        customer_location_id: customer_location_id?.customer_location_id,
      },
      headers: { Authorization: auth_token },
    }
  );
  return response.data;
};
// removeCoupon

export const removeCoupon = async (order_draft_id, auth_token) => {
  const info = { order_draft_id: order_draft_id };
  const response = await axios.put(
    `${ASP_API_URL}/api/remove_coupon_code`,
    info,
    { headers: { Authorization: auth_token } }
  );
  return response;
};

// tracking order details
export const orderTracking = async (id) => {
  const response = await axios.get(
    `${ASP_API_URL}/dashboard/track_order?order_fulfillment_id=${id}`
  );
  return response.data;
};
