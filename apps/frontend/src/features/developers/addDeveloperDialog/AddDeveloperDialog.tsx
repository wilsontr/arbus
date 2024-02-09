import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { AddDeveloperDialogProps } from "./AddDeveloperDialog.model";
import { LoadingButton } from "@mui/lab";
import { useDeveloperForm } from "../developerForm/useDeveloperForm";
import { useEffect } from "react";

export const AddDeveloperDialog = ({
  onSubmit,
  onCancel,
  isButtonLoading,
  open,
}: AddDeveloperDialogProps) => {
  const { formik, fields } = useDeveloperForm({ onSubmit });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add developer</DialogTitle>
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
                Add developer
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
