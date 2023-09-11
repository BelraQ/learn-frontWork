import React, { memo, useContext } from 'react';
import Tr from './Tr';
import TableContext from '../contexts/TableContext';
import '../styles/Table.scss';
import cn from 'classnames';
import styled from 'styled-components';

const OpacityTable = styled.table`
    opacity: ${props => props.$showUp ? 0 : 1};
  `;

const Table = memo(() => {
  const { tableData, showUp } = useContext(TableContext);

  return (
    <OpacityTable className={cn('MineTable', {showUp})} $showUp={showUp}>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => {
            return <Tr key={i} rowIndex={i}></Tr>;
          })}
      </tbody>
    </OpacityTable>
  );
});

export default Table;
