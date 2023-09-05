import { useState, useCallback } from "react";
import { MdAddBox } from "react-icons/md";
import './TodoInsert.scss';

import { INSERT } from "../App.js";

const TodoInsert = ({dispatch, nextId}) => {
    const [value, setValue] = useState('');
    console.log(value);

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onInsert = useCallback((text) => {
        console.log(text);
        dispatch({type: INSERT, id: nextId.current, text, checked: false});
        nextId.current += 1;
      }, [dispatch, nextId]);


    const onSubmit = useCallback((e) => {
        console.log(onSubmit);
        onInsert(value);
        setValue('');
        e.preventDefault();
    }, [onInsert, value]);

    //console.log(value);
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input type="text" value={value} onChange={onChange}placeholder='할 일을 입력하세요'/>
            
            <button type='submit'>
                <MdAddBox></MdAddBox>
            </button>
        </form>
    )
}

export default TodoInsert;