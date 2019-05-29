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
      framesWithStrikes: {},
      framesWithStrikesBonus: {},
      currFrame: 0,
      totalScore: 0,
      spareStatus: 0
    }
    this.pinSelect = this.pinSelect.bind(this);
    this.pinsBowl = this.pinsBowl.bind(this);
    this.updateTurn = this.updateTurn.bind(this);
  }

  pinSelect(e) {
    let clickedPins = Number(e.target.value);
    let pinsSelected = this.state.pinsSelected;
    let pinsRemaining = this.state.pinsRemaining;

    if (pinsSelected === clickedPins) {
      this.setState({
        pinsSelected: 0
      });
    } else if (clickedPins <= pinsRemaining) {
      this.setState({
        pinsSelected: clickedPins
      });
    } else {
      this.setState({
        pinsSelected: pinsRemaining
      });
    }
  }

  updateTurn() {
    let {
      currFrame,
      pinsRemaining,
      totalScore,
      frameScores,
      spareStatus,
      framesWithStrikes,
      framesWithStrikesBonus
    } = this.state;
    const currFrameTries = this.state.frameTries[currFrame];

    //if tries of current frame are all used
    if (currFrameTries.indexOf('_') < 0 || currFrameTries[0] === 10) {
      if (framesWithStrikes[currFrame - 1] !== undefined) {
        framesWithStrikesBonus[currFrame - 1].forEach((bonus) => totalScore += bonus)
      }

      if (currFrameTries[0] === 10) { //check for strikes
        totalScore += 10;
        frameScores[currFrame] = '_';
        currFrame += 1; //update current frame
        pinsRemaining = 10; //reset pins
      } else if (currFrameTries[0] + currFrameTries[1] === 10 && currFrameTries[0] !== 10) { //check for spares
        currFrameTries.forEach((score) => {
          if (typeof score === 'number') {
            totalScore += score; //update total score
          }
        });
        frameScores[currFrame] = '_' //update score for current frame
        currFrame += 1; //update current frame
        pinsRemaining = 10; //reset pins
        spareStatus = 1;
      } else { //no spares or strikes
        currFrameTries.forEach((score) => {
          if (typeof score === 'number') {
            totalScore += score; //update total score
          }
        });
        frameScores[currFrame] = totalScore//update score for current frame
        currFrame += 1; //update current frame
        pinsRemaining = 10; //reset pins
      }
    }

    this.setState({
      pinsSelected: 0,
      currFrame,
      pinsRemaining,
      totalScore,
      frameScores,
      spareStatus,
      framesWithStrikes,
      framesWithStrikesBonus
    });
  }

  pinsBowl() {
    let {
      pinsSelected,
      pinsRemaining,
      currFrame,
      spareStatus,
      frameScores,
      totalScore,
      framesWithStrikes,
      framesWithStrikesBonus
    } = this.state;
    let frameTries = this.state.frameTries.slice(); //copy tries per frame
    let currFrameTries = frameTries[currFrame]; //set to tries of current frame
    let pinsAfterBowl = pinsRemaining - pinsSelected;

    if (currFrameTries[0] === '_') {
      if (pinsAfterBowl === 0) { // if strike is bowled
        for (var i = 0; i < Object.keys(framesWithStrikes).length; i++) {
          if (framesWithStrikes[i] === i && framesWithStrikesBonus[i].length < 2) { //if the previous frame was a strike
            framesWithStrikesBonus[i].push(pinsSelected); //add current bowl as bonus points for previous frame
          }
        }
        framesWithStrikes[currFrame] = currFrame;
        framesWithStrikesBonus[currFrame] = [];
      } else if (framesWithStrikes[currFrame - 1] === currFrame - 1) {
        framesWithStrikesBonus[currFrame - 1].push(pinsSelected);
      } else if (spareStatus === 1) { //check for spare from previous frame
        totalScore += pinsSelected; //add bonus points
        frameScores[currFrame - 1] = totalScore;
        spareStatus = 0;
      }
      currFrameTries[0] = pinsSelected; //add score to first try
      frameTries[currFrame] = currFrameTries; //update tries at current frame
    } else if (currFrameTries[0] !== 10) {
      if (framesWithStrikes[currFrame - 1] === currFrame - 1) {
        framesWithStrikesBonus[currFrame - 1].push(pinsSelected);
        frameScores[currFrame - 1] = totalScore + framesWithStrikesBonus[currFrame - 1][0] + framesWithStrikesBonus[currFrame - 1][1];
      }
      currFrameTries[1] = pinsSelected; //add score to second try
      frameTries[currFrame] = currFrameTries;
    }

    this.setState({
      frameTries,
      pinsRemaining: pinsAfterBowl,
      framesWithStrikes,
      framesWithStrikesBonus,
      totalScore,
      spareStatus
    }, () => this.updateTurn());
  }

  render() {
    return (
      <div>
        Pins remaining: {this.state.pinsRemaining}
        <br />
        Pins to bowl: {this.state.pinsSelected}
        <PinPicker
          pinsRemaining={this.state.pinsRemaining}
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
