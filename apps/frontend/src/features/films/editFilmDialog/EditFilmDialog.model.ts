import { Film } from "@arbus/rtk-api";

export interface EditFilmDialogProps {
  onSubmit: (values: Film) => void;
  onCancel: () => void;
  onDelete: (filmId: number) => void;
  isButtonLoading: boolean;
  film?: Film;
  open: boolean;
}