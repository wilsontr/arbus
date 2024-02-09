import { Developer } from "@arbus/rtk-api";
import * as yup from "yup";

export const developerValidationSchema = yup.object({
  name: yup.string().required("Enter a name for this developer"),
  bottleSizeMl: yup.number(),
});

export interface UseDeveloperFormProps {
  initialValues?: Developer;
  onSubmit: (developer: Developer) => void;
}

