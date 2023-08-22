import React, { useState, useRef } from 'react';
import Try from './Try';

const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
      const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
};

const NumberBaseball = () => {
    const [result, setResult] = useState();
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers); //lazy init
    const [tries, setTries] = useState([]); 
    const inputEl = useRef();

    const handlingSubmit = (e) => {
        e.preventDefault();
        if (value === answer.join('')) { //value가 answer의 순서와 값 모두 일치할 때
            setTries((t) => [...t, { try: value, result: '홈런!'}]);
            setResult('홈런!');
        }
        else { //value가 순서와 값이 모두 일치하지 않는다면
            const answerArray = value.split('').map((v) => parseInt(v)); //value 배열화, 타입 변경
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
                alert('게임을 다시 시작합니다.');
                setTries([]);
                setAnswer(getNumbers());
            }
            else { //10번이 넘지 않아 답 확인
                console.log('답은', answer.join(''));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        console.log('strike', answerArray[i], answer[i]);
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball += 1;
                    }
                }
                setTries((t) => [...t, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}]);
            }
        }
        setValue('');
        inputEl.current.focus();
    }

    return (
        <>
            <h2>{result}</h2>
            <form onSubmit={handlingSubmit}>
                <input maxLength={4} ref={inputEl} type="number" value={value} onChange={(e) => setValue(e.target.value)}/>
                <button>입력</button>
            </form>
                <div>시도: {tries.length}</div>
            <ul>
                {
                    tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도`} v={v} i={i}/>
                        );
                    })
                }
            </ul>
        </>
    );
}

export default NumberBaseball;
