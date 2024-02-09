import { Developer } from "@arbus/rtk-api";

export const getInitialDeveloperValues = (initialValues?: Developer) => ({
  id: !!initialValues?.id ? `${initialValues?.id}` : "",
  name: initialValues?.name || "",
  bottleSizeMl: !!initialValues?.bottleSizeMl ? `${initialValues.bottleSizeMl}` : "",
});
