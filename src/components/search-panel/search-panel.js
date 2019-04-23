import React, {Component} from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    // this.setState({term: term.toUpperCase()});
    this.setState({term});
    // чтобы App обновлял список
    this.props.onSearchChange(term);
  };

  render() {
    // в react хорошая практика делать элементы контролируемыми, поэтому значение input будет получать из state
    return (
        <input type="search"
               className="form-control search-input"
               placeholder="type to search"
               // генерирует событие onSearchChange на  каждое нажатие клавиши
               onChange={this.onSearchChange}
               value={this.state.term}/>
    );
  }
}
