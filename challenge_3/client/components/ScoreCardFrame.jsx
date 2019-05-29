import React from 'react';

const scoreCardFrame = (props) => (
  <tr>
    <td>{props.score}</td>
    <td>{props.try1 === 10 ? 'X' : props.try1}</td>
    <td>{props.try2 + props.try1 === 10 ? '/' : props.try2}</td>
  </tr>
);

export default scoreCardFrame;