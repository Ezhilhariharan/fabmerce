import CustomerDashboardLayout from "components/layout/CustomerDashboardLayout";
import CustomerOrderList from "components/orders/CustomerOrderList";
import React, { useEffect,useCallback } from "react";
import { getOrders, getOrderStatuses } from "utils/api/orders-api/ordersAPI";
import { updateOrderStatusList,clearOrderState } from "../../src/store/orderSlice";
import { useDispatch } from "react-redux";
import { updateCartCount } from "../../src/store/cartSlice";
import { useRouter } from "next/router";
const Orders = (props) => {
  const { ordersList, orderStatuses, page, limit, auth_token } = props;
  const dispatch = useDispatch();
  const { asPath, replace } = useRouter();
  const refreshData = useCallback(() => replace(asPath));
  useEffect(() => {
    dispatch(updateOrderStatusList(orderStatuses));
  }, [orderStatuses]);

  useEffect(()=>{
    dispatch(updateCartCount(true));
    dispatch(clearOrderState("PURGE"))
  },[])

  useEffect(()=>{
    refreshData();
  },[])

  return (
    <CustomerDashboardLayout authToken={auth_token}>
      <CustomerOrderList ordersList={ordersList} page={page} limit={limit} />
    </CustomerDashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 10;
  const auth_token = req?.cookies?.token || null;
  const ordersList = auth_token && await getOrders(auth_token, page, limit);
  const orderStatuses = auth_token && await getOrderStatuses(auth_token);
  return {
    props: {
      ordersList,
      orderStatuses,
      page,
      limit,
      auth_token,
    },
  };
}
export default Orders;
