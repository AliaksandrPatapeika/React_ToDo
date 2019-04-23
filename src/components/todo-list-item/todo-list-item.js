import React from 'react';

import './todo-list-item.css';

// деструктурируем свойства из объекта props, чтоб не писать this.props.onDeleted
const TodoListItem = ({label, onDeleted,
                        onToggleImportant,
                        onToggleDone,
                        important, done}) => {

    let classNames = 'todo-list-item';

    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    return (
        <span className={classNames}>
          <span
              className="todo-list-item-label"
              onClick={onToggleDone}>
        {label}
          </span>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}>
          <i className="fas fa-exclamation"></i>
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                // когда клик по кнопке, вызываем ф-ю, уоторую нам передал todo-list
                onClick={onDeleted}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </span>
    );
};

export default TodoListItem;