import React, { useReducer, useMemo } from 'react';
import TableContext from '../contexts/TableContext';
import '../styles/Minesearch.scss';
import Template from './Template';
import reducer from '../modules/minereducer';

const initialState = {
  tableData: [],
  // data: {
  //   row: 0,
  //   cell: 0,
  //   mine: 0,
  // },
  timer: 1,
  result: '',
  halted: true,
  // openedCount: 0,
  showUp: false,
};

const Minesearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, showUp, timer, halted } = state;
  console.log('[minesearch]halted:', halted);
  const value = useMemo(
    () => ({
      tableData,
      dispatch,
      showUp,
      timer,
      halted,
    }),
    [tableData, showUp, timer, halted],
  );
  return (
    <TableContext.Provider value={value}>
      <Template />
    </TableContext.Provider>
  );
};

export default Minesearch;
