import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Menu from '../../components/Menu';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';
import { startGame } from '../../modules/minesearch';


const MenuContainer = memo(() => {
  const timer = useSelector(({minesearch}) => minesearch.timer);
  const dispatch = useDispatch();

  const DPstartGame = useCallback((row, cell, mine) => {
    dispatch(startGame(row, cell, mine));
  }, []);

  return (
    <Menu timer={timer} DPstartGame={DPstartGame}/>
  );
});

export default memo(MenuContainer);