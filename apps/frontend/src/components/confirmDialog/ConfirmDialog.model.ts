export interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  open: boolean;
}