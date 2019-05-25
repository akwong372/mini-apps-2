import React from 'react';
import ScoreCardFrame from './ScoreCardFrame.jsx';

const scoreCard = (props) => (
  <table>
    <thead>
      <tr>
        <th>Score</th>
        <th>Try 1</th>
        <th>Try 2</th>
      </tr>
    </thead>
    <tbody>
      {props.frameScores.map((score, i) => {
        return <ScoreCardFrame
        key={`scoreFrame${i}`}
        score={score}
        try1={props.frameTries[i][0]}
        try2={props.frameTries[i][1]}
        />
      })}
    </tbody>
  </table>
);

export default scoreCard;