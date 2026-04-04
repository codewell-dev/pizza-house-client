"use client";

import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, TextField, Stack } from "@mui/material";
import * as Yup from "yup";

interface LoginValues {
  phone: string;
  password: string;
}

const phoneRegExp = /^(\+?38)?0\d{9}$/;

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "Будь-ласка, перевірте коректність номера телефону")
    .required("Поле має бути заповнене"),
  password: Yup.string().required("Пароль не має бути порожнім"),
});

const initialValues: LoginValues = { phone: "+380", password: "" };

export default function LoginForm() {
  const handleFormSubmit = (values: LoginValues) => {
    // TODO: call auth API
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
              label="Номер телефону"
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
              label="Пароль"
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between">
              <Button type="submit" color="inherit" variant="text" fullWidth>
                Увійти
              </Button>
              <Button variant="text" color="inherit" fullWidth>
                Забули пароль?
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
