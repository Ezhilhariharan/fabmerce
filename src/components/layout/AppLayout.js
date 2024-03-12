import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
import Head from "next/head";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import {
  getCartList,
  sessionGetCartList,
} from "utils/api/checkout-apis/checkoutAPI";
import { SiteMapBackLinks } from "../footer/SiteMapBackLinks";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { updateAuthToken } from "store/authSlice";
import { updateCartCount, updateCartListItems } from "store/cartSlice";

const AppLayout = ({
  children,
  navbar,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => {
    setIsFixed(fixed);
  }, []);
  const dispatch = useDispatch();
  const updateCartList = useSelector(
    (state) => state?.cartSlice.updateCartList
  );
  const router = useRouter();
  const pathName = router.asPath;
  //  setAuth Token
  useEffect(() => {
    const auth_token = getCookie("token");
    dispatch(updateAuthToken(auth_token));
  }, []);

  //  fetch CartList
  useEffect(() => {
    const auth_token = getCookie("token");
    const sessionId = getCookie("sessionId");
    if (updateCartList === true) {
      if (auth_token && auth_token !== null) {
        const response = getCartList(auth_token, 1, 10);
        updateCarts(response);
      } else {
        const response = sessionGetCartList(sessionId, 1, 10);
        updateCarts(response);
      }
    }
  }, [updateCartList]);

  const updateCarts = (res) => {
    res
      .then((data) => {
        dispatch(updateCartListItems(data?.cart_items));
        dispatch(updateCartCount(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {/* <Topbar /> */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed}>
        <Header isFixed={isFixed} />
      </Sticky>
      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}

      <MobileNavigationBar />
      <Footer />
      {pathName === "/" && <SiteMapBackLinks />}
    </Fragment>
  );
};

export default AppLayout;
