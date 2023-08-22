const React = require('react');
const { useState, useRef } = React;

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState('1234');
    const [tries, setTries] = useState([]); 
    const ref = useRef();

    const handlingSubmit = (e) => {
        e.preventDefault();
        setResult('입력');
    }

    return (
        <>
            <h2>{result}</h2>
            <form onSubmit={handlingSubmit}>
                <input useRef={ref} maxLength={4} type="text" value={value} onChange={(e) => e.target.value}/> 
                <button>입력</button>
            </form>
                <div>시도: {tries.length}</div>
            <ul>
                {
                    tries.map(() => {
                        return (
                            <li></li>
                        );
                    })
                }
            </ul>
        </>
    );
}

module.exports = NumberBaseball;
