import React from 'react';
import PinPicker from './components/PinPicker.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        test
        <PinPicker />
      </div>
    )

  }
}

export default App;
