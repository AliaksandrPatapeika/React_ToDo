import React, {Component} from 'react';

import './item-status-filter.css'

export default class ItemStatusFilter extends Component {

  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];

  render() {

    const {filter, onFilterChange} = this.props;

    // для каждого элемента массива создадим jsx элемент
    // name и label деструктурируем прямо в объявлении функции
    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      // слово class зарезервировано
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
          <button type="button"
                  className={`btn ${clazz}`}
                  key={name}
                  onClick={() => onFilterChange(name)}>
            {label}
          </button>
      )
    });

    return (
        <div className="btn-group">
          {buttons}
        </div>
    );
  }
}
