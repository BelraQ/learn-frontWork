import React, {useState, useRef, useEffect} from 'react';

const color = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

const random = (plus, multiple) => {
    return Math.floor(Math.random() * multiple + plus);
} 

const Lotto = () => {
    const [result, setResult] = useState([]);
    const lottoTime = useRef();


    useEffect(() => {
        lottoTime.current = setTimeout(addBall, 1000);
        return () => clearTimeout(lottoTime.current);
    }, [result]);

    const addBall = () => {
        if (result.length < 6) {
            setResult((prev) => [...prev, [random(1, 30), color[random(0, 5)]]]);
        } else if (result.length === 6) {

        }
    }

    return (
        <>
        <h3>당첨 숫자</h3>
        {
            
            result.map((value, index) => {
                return (
                    <div key={value[0] + value[1] + index} id="ball" style={{background: `${value[1]}`}}> 
                        <span id='text'>{value[0]}</span>
                    </div>
                );
            })
        }
        <h3>보너스!</h3>
        <div id='ball'></div>
        </>
    );
}

export default Lotto;