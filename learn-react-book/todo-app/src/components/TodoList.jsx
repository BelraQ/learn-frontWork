import React, { useCallback, memo } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem.jsx';
import './TodoList.scss';

const TodoList = ({todos, dispatch}) => {

    const rowRenderer = useCallback(({index, key, style}) => {
        const todo = todos[index];

        return <TodoListItem key={key} todo={todo} style={style} dispatch={dispatch}/>
    }, [todos, dispatch]);

    return (
        <List
            className='TodoList'
            width={512}
            height={513}
            rowCount={todos.length}
            rowHeight={57}
            rowRenderer={rowRenderer}
            list={todos}
            style={{ outline: 'none' }}
        />
    );
};

export default TodoList;