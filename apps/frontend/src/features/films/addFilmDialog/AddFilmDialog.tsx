import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { AddFilmDialogProps } from "./AddFilmDialog.model";
import { LoadingButton } from "@mui/lab";
import { useFilmForm } from "../filmForm/useFilmForm";
import { useEffect } from "react";

export const AddFilmDialog = ({
  onSubmit,
  onCancel,
  isButtonLoading,
  open,
}: AddFilmDialogProps) => {
  const { formik, fields } = useFilmForm({ onSubmit });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add film</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            spacing={2}
            marginTop={1}
            container
            flexDirection="column"
            width={350}
          >
            {fields}

            <Grid item>
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                loading={isButtonLoading}
                disabled={isButtonLoading || !formik.isValid || !formik.dirty}
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
      </DialogContent>
    </Dialog>
  );
};
