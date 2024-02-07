import { developersApi } from "@arbus/rtk-api";
import { clickNoSelectionStyle } from "../../utils/constants";
import { DataGrid } from "@mui/x-data-grid";
import { developersColumns } from "./Developers.model";

const { useGetDevelopersQuery } = developersApi;

export const Developers = () => {
  const { data, isFetching: isFilmsFetching } = useGetDevelopersQuery();

  return (
    <>
      <DataGrid
        rows={data?.developers || []}
        columns={developersColumns}
        loading={isFilmsFetching}
        pagination={undefined}
        rowSelection={false}
        // onRowClick={handleRowClick}
        sx={clickNoSelectionStyle}
      />
    </>
  );
};
