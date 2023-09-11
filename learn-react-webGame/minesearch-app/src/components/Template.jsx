import React, {memo} from 'react';
import '../styles/Template.scss';
import Menu from './Menu';
import GameBody from './GameBody';

const Template = memo(() => {
  return (
    <div className="Template">
      <main className="main">
        <Menu/>
        <GameBody/>
      </main>
    </div>
  );
});

export default Template;
