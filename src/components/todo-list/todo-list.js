import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({todos}) => {

  // элементы массива elements это jsx-элементы
  const elements = todos.map((item) => {
    // rest parameter (в itemProps попадут все свойства, кроме id)
    const {id, ...itemProps} = item;

    return (
        // spread оператор для объекта (взять каждое свойство из объекта item и передать его в качестве атрибута вместе со значением в TodoListItem)
        // тоже что и:
        // <TodoListItem
        // label={item.label}
        // important={item.important}/>
        <li key={id} className="list-group-item">
          <TodoListItem {...itemProps}/>
        </li>
    );
  });

  return (
      <ul className="list-group todo-list">
        {/*вставляем массив элементов в jsx (добавляем все элементы поочередно)*/}
        {elements}
      </ul>
  );
};

export default TodoList;
