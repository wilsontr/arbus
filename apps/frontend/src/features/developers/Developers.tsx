import { Developer, developersApi } from "@arbus/rtk-api";
import {
  SNACKBAR_AUTO_HIDE_DURATION,
  clickNoSelectionStyle,
} from "../../utils/constants";
import { DataGrid } from "@mui/x-data-grid";
import { developersColumns } from "./Developers.model";
import { Button, Grid, Snackbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AddDeveloperDialog } from "./addDeveloperDialog";
import { useCallback, useEffect, useState } from "react";
import { omit } from "lodash";

const { useGetDevelopersQuery, useAddDeveloperMutation } = developersApi;

export const Developers = () => {
  const [showingAddDeveloperDialog, setShowingAddDeveloperDialog] =
    useState(false);
  const [addConfirmSnackbarVisible, setAddConfirmSnackbarVisible] =
    useState(false);

  const { data, isFetching: isDevelopersFetching } = useGetDevelopersQuery();
  const [
    addDeveloper,
    { isLoading: isAddDeveloperLoading, isSuccess: isAddDeveloperSuccess },
  ] = useAddDeveloperMutation();

  const handleAddButtonClick = useCallback(() => {
    setShowingAddDeveloperDialog(true);
  }, [setShowingAddDeveloperDialog]);

  const handleAddDeveloperSubmit = useCallback(
    (developer: Developer) => {
      addDeveloper(omit(developer, "id"));
    },
    [addDeveloper],
  );

  const handleAddDeveloperCancel = useCallback(() => {
    setShowingAddDeveloperDialog(false);
  }, [setShowingAddDeveloperDialog]);

  useEffect(() => {
    if (isAddDeveloperSuccess) {
      setShowingAddDeveloperDialog(false);
      setAddConfirmSnackbarVisible(true);
    }
  }, [isAddDeveloperSuccess]);

  return (
    <>
      <DataGrid
        rows={data?.developers || []}
        columns={developersColumns}
        loading={isDevelopersFetching}
        pagination={undefined}
        rowSelection={false}
        // onRowClick={handleRowClick}
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
          Add new developer
        </Button>
      </Grid>
      <AddDeveloperDialog
        onSubmit={handleAddDeveloperSubmit}
        onCancel={handleAddDeveloperCancel}
        isButtonLoading={isAddDeveloperLoading}
        open={showingAddDeveloperDialog}
      />
      <Snackbar
        open={addConfirmSnackbarVisible}
        message="Developer added."
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        onClose={() => setAddConfirmSnackbarVisible(false)}
      />
    </>
  );
};
