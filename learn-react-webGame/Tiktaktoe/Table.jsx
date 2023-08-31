import React, {memo} from 'react';
import Tr from './Tr';


const Table = memo(({tableData, onClick, dispatch}) => {
    return (
        <table className="table" onClick={onClick}>
            <tbody>
                {
                    Array(tableData.length).fill().map((v, i) => {
                        return <Tr rowData={tableData[i]} rowIndex={i} dispatch={dispatch}></Tr>
                    })
                }
            </tbody>
        </table>
    );
});

export default Table;