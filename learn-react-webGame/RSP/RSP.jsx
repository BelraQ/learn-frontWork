import React, {useState, useRef, useEffect} from 'react';
import useInterval from './useInterval';


const RSP = () => {
    const [imgCoord, setImgCoord] = useState(0);

    const rspCoords = useRef();
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    
    const scores = useRef();
    
    const [isRunning, setIsRunning] = useState(false);
    
    rspCoords.current = {
        바위: '0',
        가위: '-142px',
        보: '-284px',
    };
    scores.current = {
        가위: 1,
        바위: 0,
        보: -1,
      };

    
    const changeHand = () => {
        if (imgCoord === rspCoords.current.바위) {
            setImgCoord(rspCoords.current.가위);
        } else if (imgCoord === rspCoords.current.가위) {
            setImgCoord(rspCoords.current.보);
        } else {
            setImgCoord(rspCoords.current.바위);
        }
    }

    useInterval(changeHand, isRunning ? 1000 : null);

    

    const computerChoice = () => {

        return Object.entries(rspCoords.current).find((v) => v[1] === imgCoord)[0];
    }

    const onClickBtn = (choice) => () => {
        
        if (isRunning) { 
            setIsRunning(false); 
            const myScore = scores.current[choice];
            const cpuScore = scores.current[computerChoice()];
            const diff = myScore - cpuScore;
            console.log(computerChoice());
            if (diff === 0) {
                setResult('비겼습니다!');
            } else if ([-1, 2].includes(diff)) {
                setResult('이겼습니다!');
                setScore((prevScore) => prevScore + 1);
            } else {
                setResult('졌습니다!');
                setScore((prevScore) => prevScore - 1);
            }

            setTimeout(() => {
                setIsRunning(true);
            }, 1000); 
        }
        
    }

    return (
        <>
        <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
        <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scisser" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
        </>
    );
}

export default RSP;