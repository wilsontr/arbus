import { Film } from "@arbus/rtk-api";

export interface EditFilmFormProps {
  onSubmit: (values: Film) => void;
  onCancel: () => void;
  isButtonLoading: boolean;
  film: Film;
}