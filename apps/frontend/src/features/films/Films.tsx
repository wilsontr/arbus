import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { Film, filmsApi } from "@arbus/rtk-api";
import { filmsColumns } from "./Films.model";
import { Button, Grid, Snackbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { AddFilmDialog } from "./addFilmDialog";
import { EditFilmDialog } from "./editFilmDialog";
import omit from "lodash/omit";
import {
  SNACKBAR_AUTO_HIDE_DURATION,
  clickNoSelectionStyle,
} from "../../utils/constants";

const {
  useGetFilmsQuery,
  useAddFilmMutation,
  useUpdateFilmMutation,
  useDeleteFilmMutation,
} = filmsApi;

export const Films = () => {
  const [showingAddFilmDialog, setShowingAddFilmDialog] = useState(false);
  const [showingEditFilmDialog, setShowingEditFilmDialog] = useState(false);
  const [addConfirmSnackbarVisible, setAddConfirmSnackbarVisible] =
    useState(false);
  const [updateConfirmSnackbarVisible, setUpdateConfirmSnackbarVisible] =
    useState(false);
  const [deleteConfirmSnackbarVisible, setDeleteConfirmSnackbarVisible] =
    useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | undefined>();
  const { data, isFetching: isFilmsFetching } = useGetFilmsQuery();
  const [
    addFilm,
    { isLoading: isAddFilmLoading, isSuccess: isAddFilmSuccess },
  ] = useAddFilmMutation();
  const [
    updateFilm,
    { isLoading: isUpdateFilmLoading, isSuccess: isUpdateFilmSuccess },
  ] = useUpdateFilmMutation();
  const [deleteFilm, { isSuccess: isDeleteFilmSuccess }] =
    useDeleteFilmMutation();

  const handleAddButtonClick = useCallback(() => {
    setShowingAddFilmDialog(true);
  }, [setShowingAddFilmDialog]);

  const handleAddFilmSubmit = useCallback(
    (film: Film) => {
      addFilm(omit(film, "id"));
    },
    [addFilm],
  );

  const handleAddFilmCancel = useCallback(() => {
    setShowingAddFilmDialog(false);
  }, [setShowingAddFilmDialog]);

  useEffect(() => {
    if (isAddFilmSuccess) {
      setShowingAddFilmDialog(false);
      setAddConfirmSnackbarVisible(true);
    }
  }, [isAddFilmSuccess]);

  const handleRowClick = useCallback(
    (params: GridRowParams<Film>) => {
      const { row } = params;
      setEditingFilm(row);
      setShowingEditFilmDialog(true);
    },
    [setEditingFilm, setShowingEditFilmDialog],
  );

  const handleEditFilmCancel = useCallback(() => {
    setShowingEditFilmDialog(false);
  }, [setShowingEditFilmDialog]);

  const handleEditFilmSubmit = useCallback(
    (film: Film) => {
      updateFilm({ ...film });
    },
    [updateFilm],
  );

  useEffect(() => {
    if (isUpdateFilmSuccess) {
      setShowingEditFilmDialog(false);
      setUpdateConfirmSnackbarVisible(true);
    }
  }, [isUpdateFilmSuccess]);

  const handleDeleteFilm = useCallback(
    (filmId: number) => {
      deleteFilm(filmId);
    },
    [deleteFilm],
  );

  useEffect(() => {
    if (isDeleteFilmSuccess) {
      setShowingEditFilmDialog(false);
      setDeleteConfirmSnackbarVisible(true);
    }
  }, [isDeleteFilmSuccess]);

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
      <AddFilmDialog
        onSubmit={handleAddFilmSubmit}
        onCancel={handleAddFilmCancel}
        isButtonLoading={isAddFilmLoading}
        open={showingAddFilmDialog}
      />
      <EditFilmDialog
        onSubmit={handleEditFilmSubmit}
        onCancel={handleEditFilmCancel}
        onDelete={handleDeleteFilm}
        isButtonLoading={isUpdateFilmLoading}
        open={showingEditFilmDialog}
        film={editingFilm}
      />
      <Snackbar
        open={addConfirmSnackbarVisible}
        message="Film added."
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        onClose={() => setAddConfirmSnackbarVisible(false)}
      />
      <Snackbar
        open={updateConfirmSnackbarVisible}
        message="Film updated."
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        onClose={() => setUpdateConfirmSnackbarVisible(false)}
      />
      <Snackbar
        open={deleteConfirmSnackbarVisible}
        message="Film deleted."
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        onClose={() => setDeleteConfirmSnackbarVisible(false)}
      />
    </>
  );
};
