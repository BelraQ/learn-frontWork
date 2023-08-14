const React = require('react');
const ReactDom = require('react-dom');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const inputRef = useRef();
    const [result, setResult] = useState('');

    const inspect = (e) => {
        e.preventDefault();
        setValue(value.trim());
        console.log('trim: ', value);
        console.log('word: ', word.slice(-1) + ' value: ', value[0]);
        if (word.slice(-1) === value[0]) {
            setWord(value);
            setResult('딩동댕');
        } else {
            setResult('땡');
        }
        setValue('');
        inputRef.current.focus();
    }

    return (
        <div>
            <p>{word}</p>
            <form onSubmit={inspect}>
            <input ref={inputRef} type="text" onChange={(e) => setValue(e.target.value)} value={value}/>
            <button type="button">입력</button>
            </form>
            <p>{result}</p>
        </div>
    );
}

module.exports = WordRelay;