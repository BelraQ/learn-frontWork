import plantMine from '../utils/plantMine';
import CODE from '../utils/minecode';
import { produce } from 'immer';
import { createAction } from 'redux-actions';

const START_GAME = 'Minesearch/START_GAME';
const OPEN_CELL = 'Minesearch/OPEN_CELL';
const CLICK_MINE = 'Minesearch/CLICK_MINE';
const FLAG_CELL = 'Minesearch/FLAG_CELL';
const QUEST_CELL = 'Minesearch/QUEST_CELL';
const NORMALIZE_CELL = 'Minesearch/NORMALIZE_CELL';
const SHOWING = 'Minesearch/SHOWING';

export const startGame = (row, cell, mine) => ({
  type: START_GAME,
  tableData: plantMine(row, cell, mine),
});
export const openCell = createAction(OPEN_CELL);
export const clickMine = createAction(CLICK_MINE);
export const flagCell = createAction(FLAG_CELL);
export const questCell = createAction(QUEST_CELL);
export const normalizeCell = createAction(NORMALIZE_CELL);
export const tableShowF = () => ({type: SHOWING});

export const openCell = (row, cell) => ({ type: OPEN_CELL, row, cell });
export const clickMine = (row, cell) => ({ type: CLICK_MINE, row, cell });
export const flagCell = (row, cell) => ({ type: FLAG_CELL, row, cell });
export const questCell = (row, cell) => ({ type: QUEST_CELL, row, cell });
export const normalizeCell = (row, cell) => ({
  type: NORMALIZE_CELL,
  row,
  cell,
});


// action용 함수 - reducer 함수에 쓰임(불변성 리턴)
const tdUpdate = (initialState, index, code) =>
  produce(initialState, (draft) => {
    const [row, cell] = index;
    console.log('tdUpdate');
    switch(code) {
      case CODE.OPENED: {
        const count = aroundCellData(draft, row, cell);
        draft.tableData[row][cell] = count;
        break;
      }
      case FLAG_CELL: {
        draft.tableData[row][cell] =
        draft.tableData[row][cell] === CODE.MINE 
          ? CODE.FLAG_MINE 
          : CODE.FLAG;
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
      const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
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


const reducer = (state = initialState, action) => {
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
      console.log('reducer: state === nextState ?', state === nextState);
      return {
        ...nextState,
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
        halted: true,
      };
    case FLAG_CELL: {
      const nextState = tdUpdate(state, [action.row, action.cell], FLAG_CELL);
      return {
        ...nextState,
      };
    }
    case QUEST_CELL: {
      const nextState = tdUpdate(state, [action.row, action.cell], QUEST_CELL);
      return {
        ...nextState,
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
