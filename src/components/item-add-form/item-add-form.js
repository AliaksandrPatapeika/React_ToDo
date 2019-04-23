import React, {Component} from 'react';

import './item-add-form.css'

export default class ItemAddForm extends Component {

  // const {onItemAdded} = this.props;

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      // т.к. state не зависит от текущего state, просто передаем объект (текущее значение поля input)
      label: e.target.value
      // label: e.target.value.toUpperCase()
    });
  };

  onSubmit = (e) => {
    // отменить перезагрузку страницы при отправке формы
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
        <form className="item-add-form d-flex"
              onSubmit={this.onSubmit}>
          {/*контролируемый элемент, т.к. значение элемента (value) устанавливается из состояния (state) компонента */}
          <input type="text"
                 className="form-control"
                 placeholder="add new task"
                 onChange={this.onLabelChange}
                 value={this.state.label}/>
          <button type="submit"
                  className="btn btn-outline-secondary">Add Item
          </button>
        </form>
    );
  }
}
