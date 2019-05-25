import React from 'react';

const scoreCardFrame = (props) => (
  <tr>
    <td>{props.score}</td>
    <td>{props.try1}</td>
    <td>{props.try2}</td>
  </tr>
);

export default scoreCardFrame;