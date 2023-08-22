import React, { useState, useRef, useEffect } from 'react';
import RenderAverage from './renderAverage';

const ResponseCheck = () => {

    const [screen, setScreen] = useState('waiting');

    const [message, setMessage] = useState('클릭해서 시작하세요'); 
    const [result, setResult] = useState([]);
    
    const timeout = useRef();
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = () => {
        if (screen === "waiting") {
            setScreen('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeout.current = setTimeout(() => {
                setScreen('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor((Math.random() * 1000) + 2000));
        } else if (screen === 'ready') {
            clearTimeout(timeout.current);
            setScreen('waiting');
            setMessage('너무 성급하다!');
            
        } else if (screen === 'now') {
            endTime.current = new Date();
            setScreen('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
        }
    }

    const onReset = () => {
        setResult([]);
    }

    return (
        <>
        <div id='screen' className={screen} onClick={onClickScreen}>
            {message}
        </div>
        <RenderAverage result={result} onReset={onReset}/>
        
        </>
    );
}

export default ResponseCheck;
