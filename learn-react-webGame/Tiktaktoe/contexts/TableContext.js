import React, {createContext} from 'react';

const TableContext = createContext({
  state: {
    winner: "",
    turn: "O",
    tableData: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    recentCell: [-1, -1],
  },
  action: {
    setWinner: () => {},
    setTurn: () => {},
    setTableData: () => {},
    setRecentCell: () => {},
  }
})

export default TableContext;