import React, { memo, useContext } from 'react';
import Td from './Td';
import TableContext from '../contexts/TableContext';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[rowIndex] &&
        Array(tableData[rowIndex].length)
          .fill()
          .map((v, i) => {
            return <Td key={i} index={[rowIndex, i]}/>;
          })}
    </tr>
  );
});

export default Tr;
