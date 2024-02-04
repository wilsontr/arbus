import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { Film, filmsApi } from "@arbus/rtk-api";
import { clickNoSelectionStyle, filmsColumns } from "./Films.model";
import { Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { AddFilmForm } from "./addFilmForm";

const { useGetFilmsQuery, useAddFilmMutation } = filmsApi;

export const Films = () => {
  const [showingAddFilmForm, setShowingAddFilmForm] = useState(false);
  const { data, isFetching: isFilmsFetching } = useGetFilmsQuery();
  const [
    addFilm,
    { isLoading: isAddFilmLoading, isSuccess: isAddFilmSuccess },
  ] = useAddFilmMutation();

  const handleAddButtonClick = useCallback(() => {
    setShowingAddFilmForm(true);
  }, [setShowingAddFilmForm]);

  const handleAddFilmFormSubmit = useCallback(
    (film: Film) => {
      addFilm(film);
    },
    [addFilm],
  );

  const handleAddFilmFormCancel = useCallback(() => {
    setShowingAddFilmForm(false);
  }, [setShowingAddFilmForm]);

  const handleRowClick = useCallback((params: GridRowParams) => {
    console.log("click", params);
  }, []);

  useEffect(() => {
    setShowingAddFilmForm(false);
  }, [isAddFilmSuccess]);

  return (
    <>
      <DataGrid
        rows={data?.films || []}
        columns={filmsColumns}
        loading={isFilmsFetching}
        pagination={undefined}
        rowSelection={false}
        onRowClick={handleRowClick}
        sx={clickNoSelectionStyle}
      />
      {!showingAddFilmForm && (
        <Grid
          container
          justifyContent="flex-end"
          alignItems="flex-end"
          flexDirection="row"
          marginTop={1}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddButtonClick}
            fullWidth
          >
            Add new film
          </Button>
        </Grid>
      )}
      {showingAddFilmForm && (
        <AddFilmForm
          onSubmit={handleAddFilmFormSubmit}
          onCancel={handleAddFilmFormCancel}
          isButtonLoading={isAddFilmLoading}
        />
      )}
    </>
  );
};
