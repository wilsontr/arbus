import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import { AddFilmFormProps } from "./AddFilmForm.model";
import * as yup from "yup";

const initialValues = {
  name: "",
  speed: "",
  format: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Enter a name for this film"),
  speed: yup.number().required("Enter an ASA/ISO speed for this film"),
  format: yup.string().required("Enter a format for this film"),
});

export const AddFilmForm = ({ onSubmit, onCancel }: AddFilmFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values =>
      onSubmit({
        name: values.name,
        speed: parseInt(values.speed),
        format: values.format,
      }),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid spacing={2} container flexDirection="column">
          <Grid item>
            <h3>Add film</h3>
          </Grid>

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
          <Grid item>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Add film
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
