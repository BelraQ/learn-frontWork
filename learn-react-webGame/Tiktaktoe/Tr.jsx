import React, {memo} from 'react';
import Td from './Td';

const Tr = memo(({rowData, rowIndex, dispatch}) => {
    console.log(rowData);
    return (
        <tr>
        {
            
            Array(rowData.length).fill().map((v, i) => {
                return (
                    <Td cellData={rowData[i]} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch}/>
                )
            })
        }
        </tr>
    );
});

export default Tr;