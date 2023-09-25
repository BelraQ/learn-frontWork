import React, { memo, useMemo} from 'react';
import Form from './Form';

const Menu = memo(({timer, DPstartGame}) => {

  //console.log('timer:', timer);
  return (
    <div className="menu">
      <Form DPstartGame={DPstartGame}/>
      <div className="timer">
        <span>timer: {timer}</span>
      </div>
    </div>
  )
});

export default Menu;
