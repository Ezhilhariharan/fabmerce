import Card1 from "components/Card1";
import CustomerDashboardNavigation from "components/layout/CustomerDashboardNavigation";
import DashboardPageHeader from "components/layout/DashboardPageHeader";
import Place from "@mui/icons-material/Place";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import DashboardLayout from "../layout/CustomerDashboardLayout";
import DropDown from "components/dropdown/DropDown";
import {
  getCites,
  getProvinces,
  createLocation,
  editLocationDetails,
} from "utils/api/profile-apis/profileAPI";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { TextFields } from "../checkout/EditAddressForm";
import { error } from "../../theme/themeColors";

const AddressEditor = ({
  countryList,
  setEditLocation,
  editLocation,
  selectedAddress,
  setCreateLocation,
  refreshData,
}) => {
  const auth_token = getCookie("token");
  const router = useRouter();
  const [countryId, setCountryID] = useState();
  const [provincesId, setProvincesId] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [pincodeError, setPincodeError] = useState();
  const initialValues = {
    contact_firstname:
      editLocation === true ? selectedAddress?.contact_firstname : "",
    contact_lastname:
      editLocation === true ? selectedAddress?.contact_lastname : "",
    addressline1: editLocation === true ? selectedAddress?.address_line_1 : "",
    addressline2: editLocation === true ? selectedAddress?.address_line_2 : "",
    contact: editLocation === true ? selectedAddress?.contact_number : "",
    country: editLocation === true ? selectedAddress?.country_id : "",
    city: editLocation === true ? selectedAddress?.city_id : "",
    province: editLocation === true ? selectedAddress?.province_id : "",
    zipcode: editLocation === true ? selectedAddress?.postal_index_code : "",
    locationtype:
      editLocation === true ? selectedAddress?.location_type.toLowerCase() : "",
  };
  // handle form submit
  const handleFormSubmit = async (values) => {
    if (editLocation === true) {
      editLocationinfo(values);
    } else {
      createNewLocation(values);
    }
  };

  const handleFunction = (param, value) => {
    if (param === "country") {
      setCountryID(value);
    }
    if (param === "province") {
      setProvincesId(value);
    }
  };

  const createNewLocation = (values) => {
    const payload = {
      location_type: values.locationtype,
      city_id: values.city,
      province_id: values.province,
      country_id: values.country,
      address_line_1: values.addressline1,
      address_line_2: values.addressline2,
      postal_index_code: values.zipcode,
      contact_firstname: values.contact_firstname,
      contact_lastname: values.contact_lastname,
      contact_number: values.contact,
    };
    const res = createLocation(payload, auth_token);
    res
      .then((data) => {
        if (data.data) {
          refreshData();
          setEditLocation(false);
          setCreateLocation(false);
        }
      })
      .catch((error) => {
        console.error(error?.response);
        if (error?.response?.data?.error) {
          setPincodeError(error?.response?.data?.error);
        }
      });
  };

  const editLocationinfo = (values) => {
    const addressId = selectedAddress?.location_id;
    const payload = {
      location_type: values.locationtype,
      city_id: values.city,
      province_id: values.province,
      country_id: values.country,
      address_line_1: values.addressline1,
      address_line_2: values.addressline2,
      postal_index_code: values.zipcode,
      contact_firstname: values.contact_firstname,
      contact_lastname: values.contact_lastname,
      contact_number: values.contact,
    };
    const res = editLocationDetails(payload, auth_token, addressId);
    res
      .then((data) => {
        if (data.data) {
          refreshData();
          setEditLocation(false);
          setCreateLocation(false);
        }
      })
      .catch((error) => {
        console.error(error?.response);
        if (error?.response?.data?.error) {
          setPincodeError(error?.response?.data?.error);
        }
      });
  };

  useEffect(() => {
    if (countryId) {
      const res = getProvinces(countryId, auth_token);
      res
        .then((data) => {
          setStateList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [countryId]);
  useEffect(() => {
    if (provincesId) {
      const res = getCites(provincesId, auth_token);
      res
        .then((data) => {
          setCityList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [provincesId]);

  useEffect(() => {
    if (selectedAddress) {
      setCountryID(selectedAddress?.country_id);
      setProvincesId(selectedAddress?.province_id);
    }
  }, [selectedAddress]);

  const handlePinCodeErrorReset = useCallback((e) => {
    if (e.target.value) {
      setPincodeError("");
    }
  }, [pincodeError]);
  return (
    <div>
      <DashboardPageHeader
        icon={Place}
        title="Add New Address"
        button={
          <Button
            color="primary"
            sx={{
              bgcolor: "primary.light",
              px: "2rem",
            }}
            onClick={() => {
              setEditLocation(false);
              setCreateLocation(false);
            }}
          >
            Back to Address
          </Button>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Card1>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"country"}
                      label={"Country"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.country && !!errors.country}
                      value={values.country || ""}
                      helperText={touched.country && errors.country}
                      list={countryList}
                      handleFunction={handleFunction}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"province"}
                      label={"State"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.province && !!errors.province}
                      value={values.province || ""}
                      helperText={touched.province && errors.province}
                      list={stateList && stateList}
                      handleFunction={handleFunction}
                      disabled={stateList === undefined}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      color="info"
                      name="contact_firstname"
                      label="Contact Firstname"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_firstname || ""}
                      error={
                        !!touched.contact_firstname &&
                        !!errors.contact_firstname
                      }
                      helperText={
                        touched.contact_firstname && errors.contact_firstname
                      }
                      onKeyUp={handlePinCodeErrorReset}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      color="info"
                      name="contact_lastname"
                      label="Contact Lastname"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_lastname || ""}
                      error={
                        !!touched.contact_lastname && !!errors.contact_lastname
                      }
                      helperText={
                        touched.contact_lastname && errors.contact_lastname
                      }
                      onKeyUp={handlePinCodeErrorReset}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      color="info"
                      name="addressline1"
                      label="Address Line1"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.addressline1 || ""}
                      error={!!touched.addressline1 && !!errors.addressline1}
                      helperText={touched.addressline1 && errors.addressline1}
                      onKeyUp={handlePinCodeErrorReset}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      color="info"
                      name="addressline2"
                      label="Address Line2"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.addressline2 || ""}
                      error={!!touched.addressline2 && !!errors.addressline2}
                      helperText={touched.addressline2 && errors.addressline2}
                      onKeyUp={handlePinCodeErrorReset}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"city"}
                      label={"City"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.city && !!errors.city}
                      value={values.city || ""}
                      helperText={touched.city && errors.city}
                      list={cityList && cityList}
                      handleFunction={handleFunction}
                      disabled={cityList === undefined}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextFields
                      color="info"
                      name="contact"
                      label="Phone"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact || ""}
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      type={"number"}
                      onKeyUp={handlePinCodeErrorReset}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextFields
                      color="info"
                      name="zipcode"
                      label="ZipCode"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.zipcode || ""}
                      error={!!touched.zipcode && !!errors.zipcode}
                      helperText={touched.zipcode && errors.zipcode}
                      type={"number"}
                      onKeyUp={handlePinCodeErrorReset}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"locationtype"}
                      label={"Location Type"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.locationtype && !!errors.locationtype}
                      value={values.locationtype || ""}
                      helperText={touched.locationtype && errors.locationtype}
                      list={locationTyps}
                      handleFunction={handleFunction}
                    />
                  </Grid>
                  {pincodeError && <Grid item md={12} xs={12}>
                    <FormHelperText sx={{ color: error.main }}>
                      {"* "}{pincodeError === "PINCODE is invalid" ? "Please enter valid pin code" : pincodeError}
                    </FormHelperText>
                  </Grid>}
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

const locationTyps = {
  data: [
    {
      name: "shipping",
      id: "shipping",
    },
    {
      name: "billing",
      id: "billing",
    },
  ],
};
const checkoutSchema = yup.object().shape({
  contact_firstname: yup
    .string()
    .required("Please enter a contact firstname.")
    .matches(/^[ A-Za-z.]*$/, "special characters and Numbers are not allowed"),
  addressline1: yup
    .string()
    .required("Please enter an address.")
    .min(5)
    .matches(/^[ A-Za-z0-9_.,:/-]*$/, "Please enter valid Address."),
  contact: yup
    .string()
    .required(
      "Please enter the number so we can call if there any issues with delivery."
    )
    .min(1)
    .max(10, "contact must be at most 10 digits")
    .matches(
      /^((\(\d{3}\)[ |-]?|\d{3}-)\d{3}-\d{4}|\d{10})$/,
      "Valid Phone Number Required!"
    ),
  country: yup.string().required("Please select a country"),
  city: yup.string().required("Please select a city."),
  province: yup.string().required("Please select a state or province."),
  zipcode: yup
    .string()
    .required("Please enter a ZIP or postal code.")
    .min(5)
    .max(6)
    .matches(/^([0-9]{5}|[0-9]{6})$/, "Please give  vaild zip code."),
  locationtype: yup.string().required("Please select the location type."),
});
// AddressEditor.layout = DashboardLayout;
export default AddressEditor;
