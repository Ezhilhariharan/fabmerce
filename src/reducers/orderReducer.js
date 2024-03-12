const ORDERSTATUS_LIST = "ORDERSTATUS_LIST";
const SHIPPING_ID = "SHIPPING_ID";
const BILLING_ID = "BILLING_ID";
const PAYMENT_METHOD = "PAYMENT_METHOD";
const CART_ITEM_IDS = "CART_ITEM_IDS";
const PRODUCT_IDS = "PRODUCT_IDS";
const SHIPPING_CHARGE = "SHIPPING_CHARGE";
const BUYNOW_PRODUCT = "BUYNOW_PRODUCT";
const DRAFT_STEP1 = "DRAFT_STEP1";
const ORDER_DRAFT_SUMMARY = "ORDER_DRAFT_SUMMARY";
const ORDER_TYPE = "ORDER_TYPE";
const BUYNOW_PRODUCT_IDS = "BUYNOW_PRODUCT_IDS";
const EXCUTE_DRAFT = "EXCUTE_DRAFT";
const PRICE_SUMMERY = "PRICE_SUMMERY";
const COUPON_CODE = "COUPON_CODE";
const MINI_DRAWER = "MINI_DRAWER";

export const ordersStatusInitialState = {
  statues: [],
  billingAddress: null,
  shippingAddress: null,
  paymentMethod: null,
  cartItemIds: [],
  productIds: [],
  shippingCharge: null,
  buyNowProduct: null,
  draft1: null,
  buyNowProduct: null,
  orderDraftResponse: {},
  orderType: 0,
  buynowProductIds: {},
  excuteDraft: false,
  priceSummery: {},
  code: null,
  miniDrawer: false,
};
export const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDERSTATUS_LIST:
      return { ...state, statues: action.payload };
    case SHIPPING_ID:
      return { ...state, shippingAddress: action.payload };
    case BILLING_ID:
      return { ...state, billingAddress: action.payload };
    case PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_ITEM_IDS:
      return { ...state, cartItemIds: action.payload };
    case PRODUCT_IDS:
      return { ...state, productIds: action.payload };
    case SHIPPING_CHARGE:
      return { ...state, shippingCharge: action.payload };
    case BUYNOW_PRODUCT:
      return { ...state, buyNowProduct: action.payload };
    case DRAFT_STEP1:
      return { ...state, draft1: action.payload };
    case ORDER_DRAFT_SUMMARY:
      return { ...state, orderDraftResponse: action.payload };
    case ORDER_TYPE:
      return { ...state, orderType: action.payload };
    case BUYNOW_PRODUCT_IDS:
      return { ...state, buynowProductIds: action.payload };
    case EXCUTE_DRAFT:
      return { ...state, excuteDraft: action.payload };
    case PRICE_SUMMERY:
      return { ...state, priceSummery: action.payload };
    case COUPON_CODE:
      return { ...state, code: action.payload };
    case MINI_DRAWER:
      return { ...state, miniDrawer: action.payload };
    default: {
      return state;
    }
  }
};
