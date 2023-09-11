import React, { memo, useCallback, useContext, useEffect } from 'react';
import TableContext from '../contexts/TableContext';
import styled from 'styled-components';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUEST_CELL, NORMALIZE_CELL } from './Minesearch';

const MineTd = styled.td`
  background-color: ${(props) => props.$backgroundColor};
`;

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return '#444';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return 'red';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return 'yellow';
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
    default:
      return 'white';
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    case CODE.OPENED:
    default:
      return '';
  }
};

const Td = memo(({index}) => {
  const { tableData, dispatch } = useContext(TableContext);
  const [rowIndex, cellIndex] = index;
  const code = tableData[rowIndex][cellIndex];

  const onClickTd = useCallback(() => {
    //console.log(rowIndex, cellIndex);
    console.log('onClickTd:', code);

    switch (code) {
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
      default:
        return;
    }
  }, [code]);

  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    console.log('onRightTd');
    console.log('code:', code, 'NORMAL', CODE.NORMAL)
    switch(code) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({ type: QUEST_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });

      default:
        return;
    }
  }, [code]);

  return (
    <>
      <MineTd $backgroundColor={getTdStyle(code)} 
      onClick={onClickTd} 
      onContextMenu={onRightClickTd}>
        {getTdText(code)}
      </MineTd>
    </>
  );
});

export default Td;
