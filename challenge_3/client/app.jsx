import React from 'react';
import PinPicker from './components/PinPicker.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pinsSelected: 0
    }
    this.pinSelect = this.pinSelect.bind(this);
  }

  pinSelect(e) {
    let clickedPins = Number(e.target.value);
    let currPins = this.state.pinsSelected;

    if (currPins === clickedPins) {
      this.setState({
        pinsSelected: 0
      });
    } else {
      this.setState({
        pinsSelected: clickedPins
      });
    }
  }

  render() {
    return (
      <div>
        test
        <PinPicker pinSelect={this.pinSelect} />
      </div>
    );

  }
}

export default App;
