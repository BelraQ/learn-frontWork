import React, {useState, useRef, useEffect} from 'react';
import Ball from './Ball';


const random = (plus, multiple) => {
    return Math.floor(Math.random() * multiple + plus);
} 

const getNumbers = (bonus) => {
    if (bonus !== undefined) {
        return random(1, 30);
    } else {
        const resultArray = Array(6).fill().map(() => random(1, 30));
        console.log(resultArray);
        return resultArray;
    }
}

const Lotto = () => {

    

    const [result, setResult] = useState(getNumbers);
    const [length, setLength] = useState(0);
    const lottoTime = useRef();
    const redoTime = useRef();
    const [redo, setRedo] = useState(false);
    const [bonus, setBonus] = useState(null);

    useEffect(() => {
        lottoTime.current = setTimeout(showBall, 500);
        return () => clearTimeout(lottoTime.current);
    }, [length]);

     useEffect(() => {
        if (bonus !== null) {
            redoTime.current = setTimeout(onRedo, 1000);
            console.log('redo: ', redo);
            return () => clearTimeout(redoTime.current);
        }
     }, [bonus]);

    const onRedo = () => {
        setRedo(true);
    }

    const showBall = () => {
        if (length < 6) {
            setLength((length) => length + 1);
        } else if (bonus === null) {
            setBonus(getNumbers(bonus));
        } 
    }

    const clickRedo = () => {
        setResult(getNumbers());
        setLength(-1);
        setBonus(null);
        setRedo(false);
    }

    return (
        <>
        <h3>당첨 숫자</h3>
        {
            
            result.map((value, index) => {
                //console.log(value);
                return (
                    index <= length 
                    && <Ball key={value + index} number={value}/>
                );
            })
        }
        <h3>보너스!</h3>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={clickRedo}>한 번 더!</button>}
        </>
    );
}

export default Lotto;