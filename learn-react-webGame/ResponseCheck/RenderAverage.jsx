import React, {memo}from 'react';

const RenderAverage = React.memo({result, onReset}) => {

    
    return result.length === 0 
        ? null
        : <div>평균 시간: {result.reduce((acc, cur) => acc + cur) / result.length} ms
        <button onClick={onReset}>리셋</button>
        </div>
}

export default RenderAverage;