import React, {memo} from 'react';
import '../styles/Template.scss';
import MenuContainer from '../containers/minesearch/MenuContainer';
import GameBodyContainer from '../containers/minesearch/GameBodyContainer';

const Template = memo(() => {
  return (
    <div className="Template">
      <main className="main">
        <MenuContainer/>
        <GameBodyContainer/>
      </main>
    </div>
  );
});

export default Template;
