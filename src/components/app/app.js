import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  // const todoData = [
  //   {id: 1, label: 'Learn React', important: false},
  //   {id: 2, label: 'Build React App', important: true},
  //   {id: 3, label: 'Other task', important: false}
  // ];

  // поле класса
  maxId = 100;

  // proposal class field вместо constructor
  // функция создается на самом объекте, а не на прототипе
  // тоже самое что и:
  // constructor() {
  //   super();

  //   this.state = {
  //      todoData: [...]
  //   };

  //   this.deleteItem = (id) => {
  //     ...
  //   }
  // }
  state = {
    todoData: [
      this.createTodoItem('Learn React'),
      this.createTodoItem('Build React App'),
      this.createTodoItem('Other task')
    ],
    term: '',
    filter: 'all' // all, active, done
  };

  createTodoItem(label) {
    return {
      // generate id
      id: this.maxId++,
      label,
      important: false,
      done: false
    }
  }

  deleteItem = (id) => {
// передаем ф-ю, потому что нам нужно установить новый state, а новый state это старый массив без одного элемента.
// setState() не должен изменять текущий state.

    // setState принимает только те значения которые нужно изменить, а не весь state. Если состояние не зависит от
    // предыдущего, то в setState просто передается объект.
    // Когда состояние зависит от предыдущего (например меняется с true на false или увеличить счетчик...), то
    // передается функция (аргумент - текущий state).
    // Когда передается функция в setState код выполнится тогда когда текущий state будет в его финальном состоянии
    // деструктурировали todoData. Тоже самое что и:
    // this.setState((state) => {
    // const idx = state.todoData.findIndex(...)
    // ...
    // });
    this.setState(({todoData}) => {
      // индекс элемента для удаления
      const idx = todoData.findIndex((el) => el.id === id);
      // так нельзя, нарушается правило что нельзя изменять state, т.к. массив todoData изменяется методом splice
      // todoData.splice(idx, 1);
      // берем элементы до удаленного и после (slice не изменяет массив)
      // const before = todoData.slice(0, idx);
      // const after = todoData.slice(idx + 1);
      // spread оператор для массивов
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    // добавить элемент в конец массива
    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      };
    });

  };

  toggleProperty(arr, id, propName) {
    // индекс элемента для изменения
    const idx = arr.findIndex((el) => el.id === id);

    // обновить нужный объект в массиве (создать новый объект с обновленным свойством)
    const oldItem = arr[idx];
    // object spread operator (создаем объект с теми же свойствами и значениями что и у oldItem, изменив свойство
    // done на обратное)
    const newItem = {
      ...oldItem,
      // в новом синтаксисе так можно
      [propName]: !oldItem[propName]
    };

    // сконструировать новый массив с измененным элементом, т.к. нельзя изменять существующий (изменение объекта в
    // существующем
    // state тоже нельзя)
    return [
      ...arr.slice(0, idx),
      // на место удаленного элемента вставляем newItem
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({term});
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  search(items, term) {
    // если term пустая строка, вернуть все items
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {

    const {todoData, term, filter} = this.state;
    // фильтруем результат поиска (вначале ищем, затем фильтруем)
    const visibleItems = this.filter(
        this.search(todoData, term), filter);

    const doneCount = todoData
        .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
        <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount}/>
          <div className="top-panel d-flex">
            <SearchPanel
                onSearchChange={this.onSearchChange}/>
            <ItemStatusFilter
                filter={filter}
                onFilterChange={this.onFilterChange}/>
          </div>
          {/*передаем массив как свойство*/}
          <TodoList
              todos={visibleItems}
              // регестрируем новый event listener onDeleted, который будет получать id элемента, который мы удаляем
              onDeleted={this.deleteItem}
              // два новых эвента для TodoList
              onToggleImportant={this.onToggleImportant}
              onToggleDone={this.onToggleDone}/>
          <ItemAddForm
              onItemAdded={this.addItem}/>
        </div>
    );
  }
}
