import plantMine from '../utils/plantMine';
import CODE from '../utils/minecode';
import { produce } from 'immer';

const START_GAME = 'START_GAME';
const OPEN_CELL = 'OPEN_CELL';
const CLICK_MINE = 'CLICK_MINE';
const FLAG_CELL = 'FLAG_CELL';
const QUEST_CELL = 'QUEST_CELL';
const NORMALIZE_CELL = 'NORMALIZE_CELL';
const SHOWING = 'SHOWING';

export const startGame = (row, cell, mine) => ({
  type: START_GAME,
  tableData: plantMine(row, cell, mine),
});
export const openCell = (row, cell) => ({ type: OPEN_CELL, row, cell });
export const clickMine = (row, cell) => ({ type: CLICK_MINE, row, cell });
export const flagCell = (row, cell) => ({ type: FLAG_CELL, row, cell });
export const questCell = (row, cell) => ({ type: QUEST_CELL, row, cell });
export const normalizeCell = (row, cell) => ({
  type: NORMALIZE_CELL,
  row,
  cell,
});

// 분류하면 action 함수
const tdUpdate = (initialState, index, code) =>
  produce(initialState, (draft) => {
    const [row, cell] = index;
    console.log('tdUpdate');

    if (code === FLAG_CELL) {
      //reducer state로 받았음
      draft.tableData[row][cell] =
        draft.tableData[row][cell] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
    } else if (code === QUEST_CELL) {
      draft.tableData[row][cell] =
        draft.tableData[row][cell] === CODE.FLAG_MINE
          ? CODE.QUESTION_MINE
          : CODE.QUESTION;
    } else if (code === NORMALIZE_CELL) {
      draft.tableData[row][cell] =
        draft.tableData[row][cell] === CODE.QUESTION_MINE
          ? CODE.MINE
          : CODE.NORMAL;
    } else {
      draft.tableData[row][cell] = code;
    }
  });

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: action.tableData,
        showUp: true,
        halted: false,
      };
    }
    case OPEN_CELL: {
      console.log('opencell');
      const nextState = tdUpdate(state, [action.row, action.cell], CODE.OPENED);
      // if (nextState.showUp) {
      //   showUp
      // }
      return {
        ...nextState,
        showUp: false,
      };
    }
    case CLICK_MINE:
      const nextState = tdUpdate(
        state,
        [action.row, action.cell],
        CODE.CLICKED_MINE,
      );
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
      const nextState = tdUpdate(
        state,
        [action.row, action.cell],
        NORMALIZE_CELL,
      );
      return {
        ...nextState,
        showUp: false,
      };
    }
    case SHOWING: {
      return {
        ...state,
        showUp: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
