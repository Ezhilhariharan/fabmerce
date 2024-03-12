import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statues: [],
  billingAddress: null,
  shippingAddress: null,
  paymentMethod: null,
  cartItemIds: [],
  productIds: [],
  shippingCharge: null,
  buyNowProduct: null,
  orderDraftResponse: {},
  orderType: 0,
  priceSummery: {},
  code: null,
  miniDrawer: false,
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    updateOrderStatusList: (state, action) => {
      state.statues = action.payload;
    },
    updateBillingAddressId: (state, action) => {
      state.billingAddress = action.payload;
    },
    updateShippingAddressId: (state, action) => {
      state.shippingAddress = action.payload;
    },
    updatePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    updateCardItemIds: (state, action) => {
      state.cartItemIds = action.payload;
    },
    updateProductIds: (state, action) => {
      state.productIds = action.payload;
    },
    updateShippingCharge: (state, action) => {
      state.shippingCharge = action.payload;
    },
    updateBuyNowProduct: (state, action) => {
      state.buyNowProduct = action.payload;
    },
    updateOrderDraftResponse: (state, action) => {
      state.orderDraftResponse = action.payload;
    },
    updateOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    updatePriceSummery: (state, action) => {
      state.priceSummery = action.payload;
    },
    updateCouponCodeVale: (state, action) => {
      state.code = action.payload;
    },
    updateOpenMiniDrawer: (state, action) => {
      state.miniDrawer = action.payload;
    },
    clearOrderState: (state,action)=>{
      if(action.payload==="PURGE"){
        state.billingAddress = null,
        state.shippingAddress= null,
        state.paymentMethod= null,
        state.cartItemIds= [],
        state.productIds= [],
        state.shippingCharge= null,
        state.buyNowProduct= null,
        state.orderDraftResponse= {},
        state.orderType= 0,
        state.priceSummery= {},
        state.code= null
      }
    } 
  },
});

export const {
  updateOrderStatusList,
  updateBillingAddressId,
  updateShippingAddressId,
  updateBuyNowProduct,
  updateCardItemIds,
  updateCouponCodeVale,
  updateOpenMiniDrawer,
  updateOrderDraftResponse,
  updateOrderType,
  updatePaymentMethod,
  updatePriceSummery,
  updateProductIds,
  updateShippingCharge,
  clearOrderState
} = orderSlice.actions;

export default orderSlice.reducer;
