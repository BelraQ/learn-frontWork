import React, { memo, useCallback, useContext, useEffect } from 'react';
import TableContext from '../contexts/TableContext';
import styled from 'styled-components';
import {
  openCell,
  clickMine,
  flagCell,
  questCell,
  normalizeCell,
} from '../modules/minereducer';
import CODE from '../utils/minecode';

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

const Td = memo(({ index }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const [rowIndex, cellIndex] = index;
  const code = tableData[rowIndex][cellIndex];

  const onClickTd = useCallback(() => {
    //console.log(rowIndex, cellIndex);
    console.log('halted: ', halted);
    if (halted) {
      return;
    }
    console.log('onClickTd:', code);

    switch (code) {
      case CODE.NORMAL:
        dispatch(openCell(rowIndex, cellIndex));
        return;
      case CODE.MINE:
        console.log('ClickMine!');
        dispatch(clickMine(rowIndex, cellIndex));
        return;
      default:
        return;
    }
  }, [code, halted]);

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault();
      console.log('halted: ', halted);
      if (halted) {
        return;
      }
      console.log('onRightTd');
      console.log('code:', code, 'NORMAL', CODE.NORMAL);
      switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch(flagCell(rowIndex, cellIndex));
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch(questCell(rowIndex, cellIndex));
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch(normalizeCell(rowIndex, cellIndex));
        default:
          return;
      }
    },
    [code, halted],
  );

  return (
    <>
      <MineTd
        $backgroundColor={getTdStyle(code)}
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
      >
        {getTdText(code)}
      </MineTd>
    </>
  );
});

export default Td;
