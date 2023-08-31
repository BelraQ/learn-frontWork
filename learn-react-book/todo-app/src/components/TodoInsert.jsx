import { useState, useCallback } from "react";
import { MdAddBox } from "react-icons/md";
import './TodoInsert.scss';

const TodoInsert = ({state, nextId}) => {
    const [todos, setTodos] = state;
    const [value, setValue] = useState('');
    console.log(value);
    //console.log(onSubmit);
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onInsert = useCallback((text) => {
        const todo = {
            id: nextId.current,
            text,
            checked: false,
        };
        setTodos([...todos, todo]);
        nextId.current += 1;
      }, [value]);
    
      console.log(todos);


    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(onSubmit);
        onInsert(value);
        setValue('');
    }, [onInsert, value]);

    //console.log(value);
    return (
        <form className="TodoInsert">
            <input type="text" value={value} onChange={onChange}placeholder='할 일을 입력하세요'/>
            
            <button type='submit' onSubmit={onSubmit}>
                <MdAddBox></MdAddBox>
            </button>
        </form>
    )
}

export default TodoInsert;