import FlexBox from "components/FlexBox";
import { H2, H5 } from "components/Typography";
import { Rating } from "@mui/lab";
import { Box, Button, TextField, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import ProductComment from "./ProductComment";
import CustomPagination from "components/pagination/CustomPagination";
import { createReviews } from "utils/api/related-products/products";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ProductReview = ({ reviewData, count, page, limit, productDetails }) => {
  const authToken = useSelector((state) => state?.authSlice.authToken);
  const router = useRouter();
  const handleFormSubmit = async (values, { resetForm }) => {
    const details = {
      review_text: values?.comment,
      rating: values?.rating,
      product_parent_id: productDetails[0]?.product_parent_id,
    };
    const res = createReviews(authToken, details);
    res
      .then((data) => {
        if (data) {
          router.replace(router.asPath);
          resetForm();
        }
      })
      .catch((error) => {
        router.replace(router.asPath);
        console.log(error);
      });
  };

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: reviewSchema,
    onSubmit: handleFormSubmit,
  });
  return (
    <Box>
      {reviewData?.map((item, ind) => (
        <ProductComment {...item} key={ind} />
      ))}

      <CustomPagination count={count} limit={limit} page={page} />

      {authToken && (
        <form onSubmit={handleSubmit}>
          <H2 fontWeight="600" mt={7} mb={2.5}>
            Write a Review for this product
          </H2>
          <Box mb={2.5}>
            <FlexBox mb={1.5}>
              <H5 color="grey.700" mr={0.75}>
                Your Rating
              </H5>
              <H5 color="error.main">*</H5>
            </FlexBox>

            <Rating
              color="warn"
              size="medium"
              value={values.rating || 0}
              onChange={(_, value) => setFieldValue("rating", value)}
            />
          </Box>

          <Box mb={3}>
            <FlexBox mb={1.5}>
              <H5 color="grey.700" mr={0.75}>
                Your Review
              </H5>
              <H5 color="error.main">*</H5>
            </FlexBox>

            <TextField
              color="secondary"
              name="comment"
              placeholder="Write a review here..."
              variant="outlined"
              multiline
              fullWidth
              rows={8}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.comment || ""}
              error={!!touched.comment && !!errors.comment}
              helperText={touched.comment && errors.comment}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!(dirty && isValid)}
          >
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString(),
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required"),
});
export default ProductReview;
