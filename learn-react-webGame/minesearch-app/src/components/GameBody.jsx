import React, { useCallback, memo, useRef } from 'react';
import { motion } from 'framer-motion';
import Table from 'components/Table';
import 'styles/GameBody.scss';


const GameBody = memo(({DPtableShowF, DPcellMine, state}) => {

  const {tableData, result, showUp } = state;
  console.log('GameBody-tableData:',tableData);

  const height = useRef(0);
  //console.log(tableData.length);
  //console.log('높이: ', height);

  const settingHeight = useCallback((row) => {
    console.log('settingHeight');
    height.current = (row * 41);
    return row * 41;
  }, []);
  
  console.log('GameBody-showUp:', showUp);
  return (
    <motion.div 
    className={'GameBody'}
    initial={{height: 0}}
    animate={{height: showUp ? settingHeight(tableData.length) : height.current}} 
    transition={{
      duration: 1.3,
      easeInOut: [1],
    }}
    >
      <Table state={state} DPtableShowF={DPtableShowF} DPcellMine={DPcellMine}/>
      <div>{result}</div>
    </motion.div>
  );
});

export default GameBody;