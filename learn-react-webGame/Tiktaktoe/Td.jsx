import React, {memo, useCallback, useEffect} from 'react';
import { CLICK_CELL } from './Tiktaktoe';
import { CHANGE_TURN } from './Tiktaktoe';

const Td = memo(({cellData, rowIndex, cellIndex, dispatch}) => {
    
    const onClickTd = useCallback(() => {
        //console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
    }, [cellData])

    
    
    return (<>
        <td onClick={onClickTd}>{cellData}</td> 
        </>
    )
});

export default Td;