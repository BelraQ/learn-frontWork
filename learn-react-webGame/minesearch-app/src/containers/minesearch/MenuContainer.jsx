import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Menu from 'components/Menu';
import { startGame } from 'modules/minesearch';
import useActions from 'lib/useActions';


const MenuContainer = memo(() => {
  const timer = useSelector(({minesearch}) => minesearch.timer);
  const [DPstartGame] = useActions([startGame], []);

  return (
    <Menu timer={timer} DPstartGame={DPstartGame}/>
  );
});

export default memo(MenuContainer);