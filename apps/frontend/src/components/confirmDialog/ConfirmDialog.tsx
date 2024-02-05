import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ConfirmDialogProps } from "./ConfirmDialog.model";

export const ConfirmDialog = ({
  onConfirm,
  onCancel,
  title,
  message,
  open,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel} type="button" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} type="button" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
