"use client";

import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, TextField, Stack } from "@mui/material";
import * as Yup from "yup";
import { useTranslations } from "next-intl";

interface LoginValues {
  phone: string;
  password: string;
}

const phoneRegExp = /^(\+?38)?0\d{9}$/;
const initialValues: LoginValues = { phone: "+380", password: "" };

export default function LoginForm() {
  const t = useTranslations("login");

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, t("phoneError"))
      .required(t("phoneRequired")),
    password: Yup.string().required(t("passwordRequired")),
  });

  const handleFormSubmit = (values: LoginValues) => {
    console.log("Login attempt:", values.phone);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, touched, errors, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <TextField
              label={t("phone")}
              variant="outlined"
              name="phone"
              fullWidth
              required
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <TextField
              label={t("password")}
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              required
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
            >
              <Button type="submit" color="inherit" variant="text" fullWidth>
                {t("submit")}
              </Button>
              <Button variant="text" color="inherit" fullWidth>
                {t("forgot")}
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
