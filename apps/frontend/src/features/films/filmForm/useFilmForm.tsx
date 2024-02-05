import { useFormik } from "formik";
import { UseFilmFormProps, filmValidationSchema } from "./useFilmForm.model";
import { useMemo } from "react";
import { Grid, TextField } from "@mui/material";

export const useFilmForm = ({ initialValues, onSubmit }: UseFilmFormProps) => {
  const initialFormikValues = useMemo(
    () => ({
      name: initialValues?.name || "",
      speed: !!initialValues?.speed ? `${initialValues.speed}` : "",
      format: initialValues?.format || "",
    }),
    [initialValues],
  );

  const formik = useFormik({
    initialValues: initialFormikValues,
    validationSchema: filmValidationSchema,
    onSubmit: values =>
      onSubmit({
        name: values.name,
        speed: parseInt(values.speed),
        format: values.format,
      }),
  });

  const fields = useMemo(
    () => (
      <>
        <Grid item>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="speed"
            name="speed"
            label="Speed"
            value={formik.values.speed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={24}>
          <TextField
            fullWidth
            id="format"
            name="format"
            label="Format"
            value={formik.values.format}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </>
    ),
    [formik],
  );

  return { formik, fields };
};
