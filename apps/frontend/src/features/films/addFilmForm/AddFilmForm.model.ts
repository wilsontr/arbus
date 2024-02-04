import { Film } from "@arbus/rtk-api";

export interface AddFilmFormProps {
  onSubmit: (values: Film) => void;
  onCancel: () => void;
}