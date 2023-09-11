import { createContext } from "react";

const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

export default TableContext;