import { Film } from "@arbus/rtk-api";

export interface AddFilmDialogProps {
  onSubmit: (values: Film) => void;
  onCancel: () => void;
  isButtonLoading: boolean;
  open: boolean;
}