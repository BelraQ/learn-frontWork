import React, { useCallback, useMemo, useContext, memo } from 'react';
import useInputs from '../lib/useInputs';
import TableContext from '../contexts/TableContext';
import { START_GAME } from './Minesearch';
import '../styles/Form.scss';

const Form = memo(() => {
  const { dispatch } = useContext(TableContext);

  const [{ row, cell, mine }, onChange] = useInputs(
    useMemo(
      () => ({
        row: 10,
        cell: 10,
        mine: 0,
      }),
      [],
    ),
  );
  
  const onClickBtn = useCallback(
    (e) => {
      e.preventDefault();

      if (row < 0 || cell < 0 || mine < 0) {
        alert('0 이하입니다.');
        return false;
      } else if (row * cell < mine) {
        alert('tableData가 개수보다 적을 수 없습니다');
        return false;
      }

      console.log(row, cell, mine);
      dispatch({ type: START_GAME, row, cell, mine });
    },
    [row, cell, mine],
  );

  return (
    <form className="Form" onSubmit={onClickBtn}>
      <div className="setting">
        <input
          min="0"
          max="30"
          className="row"
          type="number"
          name="row"
          value={row}
          placeholder="세로"
          onChange={onChange}
        />
        <input
          min="0"
          max="30"
          className="cell"
          type="number"
          name="cell"
          value={cell}
          placeholder="가로"
          onChange={onChange}
        />
        <input
          min="0"
          max="30"
          className="mine"
          type="number"
          name="mine"
          value={mine}
          placeholder="지뢰"
          onChange={onChange}
        />
      </div>
      <button className="start" onClick={onClickBtn}>
        시작
      </button>
    </form>
  );
});

export default Form;
