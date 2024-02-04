import { DataGrid } from "@mui/x-data-grid";
import { filmsApi } from "@arbus/rtk-api";
import { filmsColumns } from "./Films.model";
import { Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useCallback } from "react";

const { useGetFilmsQuery } = filmsApi;

export const Films = () => {
  const { data, isFetching } = useGetFilmsQuery();

  const handleAddButtonClick = useCallback(() => {}, []);

  return (
    <>
      <DataGrid
        rows={data?.films || []}
        columns={filmsColumns}
        loading={isFetching}
        pagination={undefined}
      />
      <Grid
        container
        justifyContent="flex-end"
        alignItems="flex-end"
        flexDirection="row"
        marginTop={1}
      >
        <Grid item alignItems="flex-end" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddButtonClick}
          >
            Add new film
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
