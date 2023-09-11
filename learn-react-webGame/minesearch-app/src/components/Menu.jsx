import React, {useContext, memo} from 'react';
import Form from './Form';
import TableContext from '../contexts/TableContext';

const Menu = memo(() => {

  const {timer} = useContext(TableContext);
  //console.log('timer:', timer);
  return (
    <div className="menu">
      <Form/>
      <div className="timer">
        <span>timer: {timer}</span>
      </div>
    </div>
  );
});

export default Menu;
