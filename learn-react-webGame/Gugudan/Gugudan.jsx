const React = require("react");
const ReactDOM = require("react-dom");
const { useState, useRef } = React;

const Gugudan = () => {
  const [op1, setOp1] = useState(Math.ceil(Math.random() * 9));
  const [op2, setOp2] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const f1 = useRef();

  const check = () => {
    if (op1 * op2 === parseInt(value)) {
      setResult(value + " 정답!");
      setOp1(Math.ceil(Math.random() * 9));
      setOp2(Math.ceil(Math.random() * 9));
    } else {
      setResult(value + " 땡");
    }
    setValue("");
    f1.current.focus();
  };

  return (
    <div>
      <p>
        {op1} 곱하기 {op2}는?
      </p>
      <input
        ref={f1}
        type="number"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button onClick={check}>입력</button>
      <p>{result}</p>
    </div>
  );
};

export default Gugudan;
