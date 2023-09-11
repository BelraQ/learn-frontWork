import React, { useReducer, useMemo } from 'react';
import TableContext from '../contexts/TableContext';
import {produce} from 'immer';
import '../styles/Minesearch.scss';
import Template from './Template';


export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUEST_CELL = 'QUEST_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';


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

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1,
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

const tdUpdate = (initialState, index, code) => produce(initialState, draft => {
  const [row, cell] = index;
  console.log('tdUpdate');

  if (code === FLAG_CELL) { //reducer state로 받았음
    draft.tableData[row][cell] = (draft.tableData[row][cell] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG);
  } else if (code === QUEST_CELL) {
    draft.tableData[row][cell] = (draft.tableData[row][cell] === CODE.FLAG_MINE ? CODE.QUESTION_MINE : CODE.QUESTION);
  } else if (code === NORMALIZE_CELL) {
    draft.tableData[row][cell] = (draft.tableData[row][cell] === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL);
  } else {
    draft.tableData[row][cell] = code;
  }
});

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        showUp: true,
        halted: false,
      };
    }
    case OPEN_CELL: {
      console.log('opencell');
      const nextState = tdUpdate(state, [action.row, action.cell], CODE.OPENED);
      return {
        ...nextState,
        showUp: false,
      };
    }
    case CLICK_MINE:
      const nextState = tdUpdate(state, [action.row, action.cell], CODE.CLICKED_MINE);
      return {
        ...nextState,
        showUp: false,
        halted: true,
      };
    case FLAG_CELL: {
      const nextState = tdUpdate(state, [action.row, action.cell], FLAG_CELL);
      return {
        ...nextState,
        showUp: false,
      };
    }
    case QUEST_CELL: {
      const nextState = tdUpdate(state, [action.row, action.cell], QUEST_CELL);
      return {
        ...nextState,
        showUp: false,
      };
    }  
    case NORMALIZE_CELL: {
      const nextState = tdUpdate(state, [action.row, action.cell], NORMALIZE_CELL);
      return {
        ...nextState,
        showUp: false,
      };
    }  
    default: {
      return state;
    }
  }
};

const Minesearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({
      tableData: state.tableData,
      dispatch,
      showUp: state.showUp,
      timer: state.timer,
    }),
    [state.tableData, state.showUp, state.timer],
  );
  return (
    <TableContext.Provider value={value}>
      <Template/>
    </TableContext.Provider>
  );
};

export default Minesearch;
