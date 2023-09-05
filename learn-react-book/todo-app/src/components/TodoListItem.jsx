import {MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline} from 'react-icons/md';
import './TodoListItem.scss';
import cn from 'classnames';
import React, { useCallback, memo } from 'react';

import { CHECK, REMOVE } from '../App';

const TodoListItem = ({todo, dispatch, style}) => {
    const {id, text, checked} = todo;

    const onChecked = useCallback(() => {
        dispatch({type: CHECK, id});
    }, [dispatch, id]);;

    const onRemove = useCallback(() => {
        dispatch({type: REMOVE, id});
    }, [dispatch, id]);


    return (
        <div className='TodoListItem-virtualized' style={style}>
            <div className='TodoListItem'>
                <div className={cn('checkBox', {checked})} onClick={onChecked}>
                    {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                    <div className='text'>{text}</div>
                </div>
                <div className='remove' onClick={onRemove}>
                    <MdRemoveCircleOutline/>
                </div>
            </div>
        </div>
    );
};

export default TodoListItem;
