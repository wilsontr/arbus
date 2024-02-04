import { DataGrid } from "@mui/x-data-grid";
import { filmsApi } from "@arbus/rtk-api";
import { filmsColumns } from "./Films.model";

const { useGetFilmsQuery } = filmsApi;

export const Films = () => {
  const { data, isFetching } = useGetFilmsQuery();
  return (
    <DataGrid
      rows={data?.films || []}
      columns={filmsColumns}
      loading={isFetching}
      pagination={undefined}
    />
  );
};
