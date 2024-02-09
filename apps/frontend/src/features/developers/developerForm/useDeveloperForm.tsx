import { useFormik } from "formik";
import {
  UseDeveloperFormProps,
  developerValidationSchema,
} from "./useDeveloperForm.model";
import { useMemo } from "react";
import { Grid, TextField } from "@mui/material";
import { getInitialDeveloperValues } from "./useDeveloperForm.utils";

export const useDeveloperForm = ({
  initialValues,
  onSubmit,
}: UseDeveloperFormProps) => {
  const initialFormikValues = useMemo(
    () => getInitialDeveloperValues(initialValues),
    [initialValues],
  );

  const formik = useFormik({
    initialValues: initialFormikValues,
    validationSchema: developerValidationSchema,
    onSubmit: values =>
      onSubmit({
        id: parseInt(values.id),
        name: values.name,
        bottleSizeMl: parseInt(values.bottleSizeMl),
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
            id="bottleSizeMl"
            name="bottleSizeMl"
            label="Bottle size (ml)"
            value={formik.values.bottleSizeMl}
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
