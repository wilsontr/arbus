import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { filmsApi } from "@arbus/rtk-api";
// import TableContainer from '@mui/material/TableContainer';

const { useGetFilmsQuery } = filmsApi;

const columns: GridColDef[] = [
  {
    headerName: "Name",
    type: "string",
    field: "name",
    width: 150,
  },
  {
    headerName: "Speed",
    type: "number",
    field: "speed",
    width: 200,
  },
  {
    headerName: "Format",
    type: "string",
    field: "format",
    width: 150,
    align: "right",
    headerAlign: "right",
  },
];

export const Films = () => {
  const { data, isFetching } = useGetFilmsQuery();
  return (
    <DataGrid
      rows={data?.films || []}
      columns={columns}
      loading={isFetching}
      pagination={undefined}
    />
  );
};
