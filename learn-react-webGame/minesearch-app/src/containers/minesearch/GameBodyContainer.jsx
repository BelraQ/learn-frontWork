import React, { memo, useCallback, useMemo } from 'react';
import GameBody from '../../components/GameBody';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import { clickMine, flagCell, normalizeCell, openCell, questCell, tableShowF } from '../../modules/minesearch';

const GameBodyContainer = memo(() => {
  const state = useSelector(({ minesearch }) => ({
    tableData: minesearch.tableData,
    result: minesearch.result,
    showUp: minesearch.showUp,
    halted: minesearch.halted,
  }));
  const dispatch = useDispatch();
  const DPtableShowF = useCallback(() => dispatch(tableShowF()), []);
  const DPopenCell = useCallback(
    (rowIndex, cellIndex) => dispatch(openCell(rowIndex, cellIndex)),
    [],
  );
  const DPclickMine = useCallback((rowIndex, cellIndex) => {
    console.log('DPclickMine');
    dispatch(clickMine(rowIndex, cellIndex));
  }, []);
  const DPflagCell = useCallback((rowIndex, cellIndex) => dispatch(flagCell(rowIndex, cellIndex)), []);
  const DPquestCell = useCallback((rowIndex, cellIndex) => dispatch(questCell(rowIndex, cellIndex)), []);
  const DPnormalizeCell = useCallback((rowIndex, cellIndex) => dispatch(normalizeCell(rowIndex, cellIndex)), []);

  const DPcellMine = useMemo(
    () => ({
      DPopenCell,
      DPclickMine,
      DPflagCell,
      DPquestCell,
      DPnormalizeCell,
    }),
    [],
  );
  return (
    <GameBody
      DPtableShowF={DPtableShowF}
      DPcellMine={DPcellMine}
      state={state}
    />
  );
});

export default memo(GameBodyContainer);
