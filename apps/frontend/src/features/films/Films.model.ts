import { GridColDef } from "@mui/x-data-grid";

export const filmsColumns: GridColDef[] = [
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
    width: 125,
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