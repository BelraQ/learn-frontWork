import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import Table from "./Table";

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "SET_TURN";
export const SET_GAME = "SET_GAME";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return { ...state, winner: action.winner };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      //console.log('얕은 복사1', tableData);
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return { ...state, tableData, recentCell: [action.row, action.cell] };
    case CHANGE_TURN:
      const setTurn = state.turn === "O" ? "X" : "O";
      return { ...state, turn: setTurn };
    case SET_GAME:
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    default:
        return state;
  }
};

const Tiktaktoe = () => {
  const initialState = {
    winner: "",
    turn: "O",
    tableData: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    recentCell: [-1, -1],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, tableData, turn, recentCell } = state;

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: "O" });
  });

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: SET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => {
        // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });
      } else {
          dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님이 승리</div>}
    </>
  );
};

export default Tiktaktoe;
