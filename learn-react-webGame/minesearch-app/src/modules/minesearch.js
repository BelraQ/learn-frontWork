import plantMine from 'utils/plantMine';
import CODE from 'utils/minecode';
import { produce } from 'immer';
import { createAction, handleActions } from 'redux-actions';

const START_GAME = 'Minesearch/START_GAME';
const OPEN_CELL = 'Minesearch/OPEN_CELL';
const CLICK_MINE = 'Minesearch/CLICK_MINE';
const FLAG_CELL = 'Minesearch/FLAG_CELL';
const QUEST_CELL = 'Minesearch/QUEST_CELL';
const NORMALIZE_CELL = 'Minesearch/NORMALIZE_CELL';
const SHOWING = 'Minesearch/SHOWING';

export const startGame = createAction(START_GAME, ({ row, cell, mine }) =>
  plantMine(row, cell, mine),
);
export const openCell = createAction(OPEN_CELL, (rowCell) => rowCell);
export const clickMine = createAction(CLICK_MINE, (rowCell) => rowCell);
export const flagCell = createAction(FLAG_CELL, (rowCell) => rowCell);
export const questCell = createAction(QUEST_CELL, (rowCell) => rowCell);
export const normalizeCell = createAction(NORMALIZE_CELL, (rowCell) => rowCell);
export const tableShowF = createAction(SHOWING);

// action용 함수 - reducer 함수에 쓰임(불변성 리턴)
const tdUpdate = (initialState, index, code) =>
  produce(initialState, (draft) => {
    const [row, cell] = index;
    console.log('tdUpdate');
    switch (code) {
      case CODE.OPENED: {
        const count = aroundCellData(draft, row, cell);
        draft.tableData[row][cell] = count;
        break;
      }
      case FLAG_CELL: {
        draft.tableData[row][cell] =
          draft.tableData[row][cell] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
        break;
      }
      case QUEST_CELL: {
        draft.tableData[row][cell] =
          draft.tableData[row][cell] === CODE.FLAG_MINE
            ? CODE.QUESTION_MINE
            : CODE.QUESTION;
        break;
      }
      case NORMALIZE_CELL: {
        draft.tableData[row][cell] =
          draft.tableData[row][cell] === CODE.QUESTION_MINE
            ? CODE.MINE
            : CODE.NORMAL;
        break;
      }
      default: {
        draft.tableData[row][cell] = code;
      }
    }
  });

//td 주변 폭탄 개수 확인용 함수 - tdUpdate 내부에 쓰임
const aroundCellData = (draft, row, cell) => {
  const prevRow = row - 1;
  const nextRow = row + 1;
  let around = [];
  if (draft.tableData[row - 1]) {
    around = around.concat(
      draft.tableData[prevRow][cell - 1],
      draft.tableData[prevRow][cell],
      draft.tableData[prevRow][cell + 1],
    );
  }
  around = around.concat(
    draft.tableData[row][cell - 1],
    draft.tableData[row][cell + 1],
  );
  if (draft.tableData[row - 1]) {
    around = around.concat(
      draft.tableData[nextRow][cell - 1],
      draft.tableData[nextRow][cell],
      draft.tableData[nextRow][cell + 1],
    );
  }
  const count = around.filter((v) =>
    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v),
  ).length;
  console.log('count:', count);
  return count;
};

// action 끝.

//reducer 시작.

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

const reducer = handleActions(
  {
    [START_GAME]: (state, { payload: tableData }) => ({
      ...state,
      tableData: tableData,
      showUp: true,
      halted: false,
    }),
    [OPEN_CELL]: (state, { payload: rowCell }) => {
      console.log('opencell');
      const nextState = tdUpdate(
        state,
        [rowCell.rowIndex, rowCell.cellIndex],
        CODE.OPENED,
      );
      console.log('reducer: state === nextState ?', state === nextState);
      return {
        ...nextState,
      };
    },

    [CLICK_MINE]: (state, { payload: rowCell }) => {
      const nextState = tdUpdate(
        state,
        [rowCell.rowIndex, rowCell.cellIndex],
        CODE.CLICKED_MINE,
      );
      return {
        ...nextState,
        halted: true,
      };
    },
    [FLAG_CELL]: (state, { payload: rowCell }) => {
      const nextState = tdUpdate(state, [rowCell.rowIndex, rowCell.cellIndex], FLAG_CELL);
      return {
        ...nextState,
      };
    },
    [QUEST_CELL]: (state, { payload: rowCell }) => {
      const nextState = tdUpdate(
        state,
        [rowCell.rowIndex, rowCell.cellIndex],
        QUEST_CELL,
      );
      return {
        ...nextState,
      };
    },
    [NORMALIZE_CELL]: (state, { payload: rowCell }) => {
      const nextState = tdUpdate(
        state,
        [rowCell.rowIndex, rowCell.cellIndex],
        NORMALIZE_CELL,
      );
      return {
        ...nextState,
      };
    },
    [SHOWING]: (state, action) => ({
      ...state,
      showUp: false,
    }),
  },
  initialState,
);

export default reducer;
