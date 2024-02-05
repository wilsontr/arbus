import { Film } from "@arbus/rtk-api";

export const getInitialFilmValues = (initialValues?: Film) => ({
  id: !!initialValues?.id ? `${initialValues?.id}` : "",
  name: initialValues?.name || "",
  speed: !!initialValues?.speed ? `${initialValues.speed}` : "",
  format: initialValues?.format || "",
});
