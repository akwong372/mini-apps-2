import React from 'react';

class eventItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: 0
    }
    this.editing = this.editing.bind(this);
  }

  editing() {
    if (this.state.editing === 1) {
      this.setState({
        editing: 0
      });
    } else {
      this.setState({
        editing: 1
      });
    }
  }

  render() {
    const { date, description, category1, category2, granularity, lang } = this.props;
    const editButton = <button type='button' className='btn btn-outline-primary btn-sm my-sm-3' onClick={this.editing}>Edit</button>
    const saveButton = <button type='button' className='btn btn-outline-success btn-sm my-sm-3' onClick={this.editing}>Save</button>

    return (
      <li className='list-group-item'>
        <h2>{date}</h2>
        <p>
          {description}
        </p>
        {this.state.editing === 0 ? editButton : saveButton}
        <div>
          Sorted type:
        <br />
          <div>{category1} &gt; {category2}</div>
        </div>
      </li>
    )
  };
};

export default eventItem;