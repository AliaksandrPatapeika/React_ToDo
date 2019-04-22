import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

  // proposal class field instead constructor
  // функция создается на самом объекте, а не на прототипе
  // тоже самое что и:
  // constructor() {
  //   super();

  //   this.state = {
  //      done: false
  //   };

  //   this.onLabelClick = () => {
  //     console.log(`click ${this.props.label}`);
  //   }
  // }
  state = {
    done: false,
    important: false
  };

  onLabelClick = () => {
    this.setState({
      // setState принимает только те значения которые нужно изменить, а не весь state
      done: true
    });
  };

  onMarkImportant = () => {
    this.setState({
      important: true
    });
  };

  render() {

    const {label} = this.props;
    const {done, important} = this.state;

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
              onClick={this.onLabelClick}>
        {label}
          </span>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={this.onMarkImportant}>
          <i className="fas fa-exclamation"></i>
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right">
          <i className="fas fa-trash-alt"></i>
        </button>
      </span>
    );
  }
}
