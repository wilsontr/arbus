import { GridColDef } from "@mui/x-data-grid";

export const developersColumns: GridColDef[] = [
  {
    headerName: "Name",
    type: "string",
    field: "name",
    width: 250,
  },
  {
    headerName: "Bottle size (ml)",
    type: "number",
    field: "bottleSizeMl",
    width: 125,
  },
];
