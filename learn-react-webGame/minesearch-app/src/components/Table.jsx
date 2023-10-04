import React, { memo, useCallback } from 'react';
import Tr from 'components/Tr';
import 'styles/Table.scss';
import { motion } from 'framer-motion';

const Table = memo(({ state, DPtableShowF, DPcellMine }) => {
  const { tableData, showUp } = state;
  
  console.log('showUp:', showUp);

  const showUpStep = useCallback(() => {
    DPtableShowF();
    return {
      opacity: 1,
    };
  }, []);

  return (
      <motion.table
        className={'MineTable'}
        initial={{ opacity: 0 }}
        animate={showUp && showUpStep}
        transition={{
          duration: 1,
          delay: 1.3,
        }}
      >
        <tbody>
          {Array(tableData.length)
            .fill()
            .map((tr, i) => {
              return (
                <Tr
                  key={'minetable' + i}
                  rowIndex={i}
                  tableData={tableData}
                  halted={state.halted}
                  DPcellMine={DPcellMine}
                ></Tr>
              );
            })}
        </tbody>
      </motion.table>
  );
  
});

export default Table;
