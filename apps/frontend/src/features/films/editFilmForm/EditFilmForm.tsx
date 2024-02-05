import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFilmForm } from "../filmForm/useFilmForm";
import { EditFilmFormProps } from "./EditFilmForm.model";

export const EditFilmForm = ({
  film,
  onSubmit,
  onCancel,
  isButtonLoading,
}: EditFilmFormProps) => {
  const { formik, fields } = useFilmForm({ initialValues: film, onSubmit });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid spacing={2} container flexDirection="column">
          <Grid item>
            <h3>Edit film</h3>
          </Grid>

          {fields}

          <Grid item>
            <LoadingButton
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              loading={isButtonLoading}
              disabled={isButtonLoading}
            >
              Add film
            </LoadingButton>
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
