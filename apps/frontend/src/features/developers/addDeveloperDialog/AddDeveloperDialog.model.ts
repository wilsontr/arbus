import { Developer } from "@arbus/rtk-api";

export interface AddDeveloperDialogProps {
  onSubmit: (values: Developer) => void;
  onCancel: () => void;
  isButtonLoading: boolean;
  open: boolean;
}