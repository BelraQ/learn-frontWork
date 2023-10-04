import React, { memo, useMemo } from 'react';
import GameBody from 'components/GameBody';
import { useSelector } from 'react-redux';
import {
  clickMine,
  flagCell,
  normalizeCell,
  openCell,
  questCell,
  tableShowF,
} from 'modules/minesearch';
import useActions from 'lib/useActions';

const GameBodyContainer = memo(() => {
  const state = useSelector(({ minesearch }) => ({
    tableData: minesearch.tableData,
    result: minesearch.result,
    showUp: minesearch.showUp,
    halted: minesearch.halted,
  }));
  const [
    DPtableShowF,
    DPopenCell,
    DPclickMine,
    DPflagCell,
    DPquestCell,
    DPnormalizeCell,
  ] = useActions(
    [tableShowF, openCell, clickMine, flagCell, questCell, normalizeCell],
    [],
  );
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
