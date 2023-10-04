import React, { memo } from 'react';
import Td from 'components/Td';

const Tr = memo(({ rowIndex, tableData, halted, DPcellMine }) => {
  return (
    <tr>
      {tableData[rowIndex] &&
        Array(tableData[rowIndex].length)
          .fill()
          .map((v, i) => {
            return (
              <Td
                key={'minetable' + i}
                index={[rowIndex, i]}
                tableData={tableData}
                halted={halted}
                DPcellMine={DPcellMine}
              />
            );
          })}
    </tr>
  );
});

export default Tr;
