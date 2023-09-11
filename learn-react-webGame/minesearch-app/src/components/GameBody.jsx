import React, {useCallback, useContext, memo, useRef} from 'react';
import styled, {keyframes} from 'styled-components';
import TableContext from '../contexts/TableContext';
import Table from './Table';


const Body = styled.div`
    margin: 2rem 0 1.5rem;
    //height: ${props => props.$row * 40 || 0}px;
    animation-name: ${({$row, $long, $setting, $height}) => $long($height, $setting($row))};
    animation-duration: 1.3s; 
    animation-timing-function: ease-in-out;
    -webkit-animation-fill-mode:both;
  `;

const long = (height, autoSet) => keyframes`
    from {
      height: ${height}px;
    }
    to {
      height: ${autoSet}px;  
    }
  `;

const GameBody = memo(() => {

  const {tableData, result} = useContext(TableContext);
  const height = useRef(0);
  //console.log(tableData.length);
  //console.log('높이: ', height);

  const settingHeight = useCallback((row) => {
    height.current = (row * 41);
    return row * 41;
  }, []);

  return (
    <Body $row={tableData.length} $setting={settingHeight} $long={long} $height={height.current}>
      <Table/>
      <div>{result}</div>
    </Body>
  );
});

export default GameBody;