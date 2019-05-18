import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    <div>
      <h1>test</h1>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));