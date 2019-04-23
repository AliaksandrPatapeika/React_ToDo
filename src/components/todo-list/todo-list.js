import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({todos, onDeleted,
                    onToggleImportant,
                    onToggleDone}) => {

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
        // onDeleted - кастомный event, передается callback ф-я, как property, а затем она вызывается из компонента,
        // когда насупит событие
        <li key={id} className="list-group-item">
          <TodoListItem
              {...itemProps}
              // вызываем ф-ю, которую передал app
              onDeleted={() => onDeleted(id)}
              onToggleImportant={() => onToggleImportant(id)}
              onToggleDone={() => onToggleDone(id)}/>
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
