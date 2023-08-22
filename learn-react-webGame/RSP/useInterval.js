import React, {useRef, useEffect} from 'react';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    })

    useEffect(() => {

        const tick = () => { //delay 변경의 리렌더링마다 최신 콜백을 받아옴
            // console.log('실행 중');
            return savedCallback.current(); 
            
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id); // 변경될 때 clearInterval 실행
        }
    }, [delay]);

    return savedCallback.current;
}

export default useInterval;