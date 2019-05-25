import React from 'react';
import PinPicker from './components/PinPicker.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pinsSelected: 0,
      pinsRemaining: 10
    }
    this.pinSelect = this.pinSelect.bind(this);
    this.pinsBowl = this.pinsBowl.bind(this);
  }

  pinSelect(e) {
    let clickedPins = Number(e.target.value);
    let pinsSelected = this.state.pinsSelected;

    if (pinsSelected === clickedPins) {
      this.setState({
        pinsSelected: 0
      });
    } else {
      this.setState({
        pinsSelected: clickedPins
      });
    }
  }

  pinsBowl(){
    const pinsSelected = this.state.pinsSelected;
    const pinsRemaining = this.state.pinsRemaining;
    const bowledPins = pinsRemaining - pinsSelected;

    this.setState({
      pinsRemaining: bowledPins
    });
  }

  render() {
    return (
      <div>
        Pins remaining: {this.state.pinsRemaining}
        <PinPicker pinSelect={this.pinSelect} pinsBowl={this.pinsBowl}/>
      </div>
    );

  }
}

export default App;
