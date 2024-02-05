import { Film } from "@arbus/rtk-api";
import * as yup from "yup";

export const filmValidationSchema = yup.object({
  name: yup.string().required("Enter a name for this film"),
  speed: yup.number().required("Enter an ASA/ISO speed for this film"),
  format: yup.string().required("Enter a format for this film"),
});

export interface UseFilmFormProps {
  initialValues?: Film;
  onSubmit: (film: Film) => void;
}

