import { Button, Grid } from "@mui/material";
import { AddFilmFormProps } from "./AddFilmForm.model";
import { LoadingButton } from "@mui/lab";
import { useFilmForm } from "../filmForm/useFilmForm";

export const AddFilmForm = ({
  onSubmit,
  onCancel,
  isButtonLoading,
}: AddFilmFormProps) => {
  const { formik, fields } = useFilmForm({ onSubmit });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid spacing={2} container flexDirection="column">
          <Grid item>
            <h3>Add film</h3>
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
