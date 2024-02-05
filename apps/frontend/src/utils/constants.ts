export const clickNoSelectionStyle = {
  // disable cell selection style
  ".MuiDataGrid-cell:focus": {
    outline: "none",
  },
  // pointer cursor on ALL rows
  "& .MuiDataGrid-row:hover": {
    cursor: "pointer",
  },
};

export const SNACKBAR_AUTO_HIDE_DURATION = 5000;