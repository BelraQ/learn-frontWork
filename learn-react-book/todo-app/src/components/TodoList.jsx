import React from 'react';
import TodoListItem from './TodoListItem.jsx';
import './TodoList.scss';

const TodoList = ({todos}) => {
    return (
        <div className='TodoList'>
            {
                todos.map((todo) => {
                    return (
                        <TodoListItem key={todo.id} todo={todo}/>
                    );
                })
            }
        </div>
    );
};

export default TodoList;