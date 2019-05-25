import React from 'react';
import PinPicker from './components/PinPicker.jsx';
import ScoreCard from './components/ScoreCard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pinsSelected: 0,
      pinsRemaining: 10,
      totalFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      frameScores: ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
      frameTries: [['_', '_'], ['_', '_'], ['_', '_'], ['_', '_'], ['_', '_'], ['_', '_'], ['_', '_'], ['_', '_'], ['_', '_'], ['_', '_']],
      currFrame: 0,
      totalScore: 0
    }
    this.pinSelect = this.pinSelect.bind(this);
    this.pinsBowl = this.pinsBowl.bind(this);
    this.updateTurn = this.updateTurn.bind(this);
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

  updateTurn() {
    let { currFrame, pinsRemaining, totalScore, frameScores } = this.state;
    const currFrameTries = this.state.frameTries[currFrame];

    //if tries of current frame are all used
    if (currFrameTries.indexOf('_') < 0) {
      currFrameTries.forEach((score) => totalScore += score)//update total score
      frameScores[currFrame] = totalScore//update score for current frame
      currFrame += 1; //update current frame
      pinsRemaining = 10; //reset pins
    }

    this.setState({ currFrame, pinsRemaining, totalScore, frameScores })

  }

  pinsBowl() {
    const { pinsSelected, pinsRemaining, currFrame } = this.state;
    let frameTries = this.state.frameTries.slice(); //copy tries per frame
    let currFrameTries = frameTries[currFrame]; //set to tries of current frame
    let pinsAfterBowl = pinsRemaining - pinsSelected;

    if (currFrameTries[0] === '_') {
      currFrameTries[0] = pinsSelected; //add score to first try
      frameTries[currFrame] = currFrameTries; //update tries at current frame
    } else if (currFrameTries[1] === '_') {
      currFrameTries[1] = pinsSelected; //add score to second try
      frameTries[currFrame] = currFrameTries;
    }

    this.setState({
      frameTries,
      pinsRemaining: pinsAfterBowl
    }, () => this.updateTurn());
  }

  render() {
    return (
      <div>
        Pins remaining: {this.state.pinsRemaining}
        <br />
        Pins to bowl: {this.state.pinsSelected}
        <PinPicker
          pinSelect={this.pinSelect}
          pinsBowl={this.pinsBowl}
          currFrame={this.state.currFrame}
        />
        <hr />
        <div>
          <ScoreCard
            totalScore={this.state.totalScore}
            frameScores={this.state.frameScores}
            frameTries={this.state.frameTries}
          />
        </div>
      </div>
    );

  }
}

export default App;
