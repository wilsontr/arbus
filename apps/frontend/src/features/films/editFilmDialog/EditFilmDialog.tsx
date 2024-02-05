import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFilmForm } from "../filmForm/useFilmForm";
import { EditFilmDialogProps } from "./EditFilmDialog.model";
import { getInitialFilmValues } from "../filmForm/useFilmForm.utils";
import { ConfirmDialog } from "components";

export const EditFilmDialog = ({
  film,
  onSubmit,
  onCancel,
  onDelete,
  isButtonLoading,
  open,
}: EditFilmDialogProps) => {
  const { formik, fields } = useFilmForm({ initialValues: film, onSubmit });
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);

  useEffect(() => {
    formik.setValues(getInitialFilmValues(film));
  }, [film]);

  useEffect(() => {}, [open]);

  const handleDeleteButtonClick = useCallback(() => {
    setDeleteConfirmDialogOpen(true);
  }, [setDeleteConfirmDialogOpen]);

  const handleDeleteFilmCancel = useCallback(() => {
    setDeleteConfirmDialogOpen(false);
  }, [setDeleteConfirmDialogOpen]);

  const handleDeleteFilmConfirm = useCallback(() => {
    const id = parseInt(formik.values.id);
    onDelete(id);
    setDeleteConfirmDialogOpen(false);
  }, [formik, onDelete, setDeleteConfirmDialogOpen]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Edit film</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            spacing={2}
            container
            flexDirection="column"
            width={350}
            marginTop={1}
          >
            {fields}

            <Grid item>
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                loading={isButtonLoading}
                disabled={isButtonLoading || !formik.isValid}
              >
                Update film
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button
                color="warning"
                variant="text"
                fullWidth
                onClick={handleDeleteButtonClick}
              >
                Delete film
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
      </DialogContent>
      <ConfirmDialog
        title="Delete film"
        message="Are you sure you want to delete this film?"
        onCancel={handleDeleteFilmCancel}
        onConfirm={handleDeleteFilmConfirm}
        open={deleteConfirmDialogOpen}
      />
    </Dialog>
  );
};
