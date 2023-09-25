import React, {
  memo,
  useCallback,
} from 'react';
import styled from 'styled-components';
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
      return code || '';
  }
};

const Td = memo(({ index, tableData, halted, DPcellMine }) => {
  const [rowIndex, cellIndex] = index;
  const code = tableData[rowIndex][cellIndex];
  const { DPopenCell, DPclickMine, DPflagCell, DPquestCell, DPnormalizeCell } =
    DPcellMine;

  


  const onClickTd = useCallback(() => {
    //console.log(rowIndex, cellIndex);
    console.log('halted: ', halted);
    if (halted) {
      return;
    }
    console.log('onClickTd:', code);

    switch (code) {
      case CODE.NORMAL:
        DPopenCell({rowIndex, cellIndex});
        return;
      case CODE.MINE:
        console.log('ClickMine!');
        DPclickMine({rowIndex, cellIndex});
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
          DPflagCell({rowIndex, cellIndex});
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          DPquestCell({rowIndex, cellIndex});
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          DPnormalizeCell({rowIndex, cellIndex});
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
