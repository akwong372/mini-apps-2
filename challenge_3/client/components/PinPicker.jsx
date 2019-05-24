import React from 'react';
import PinPickerButton from './PinPickerButton.jsx';

const pinPicker = (props) => (
  <div>
    <table>
      <tr>
        {[1, 2, 3].map((number) => {
          return <td><PinPickerButton key={`button${number}`} number={number} /></td>
        })}
      </tr>
      <tr>
        {[4, 5, 6].map((number) => {
          return <td><PinPickerButton key={`button${number}`} number={number} /></td>
        })}
      </tr>
      <tr>
        {[7, 8, 9].map((number) => {
          return <td><PinPickerButton key={`button${number}`} number={number} /></td>
        })}
      </tr>
      <tr>
        {[10].map((number) => {
          return <td><PinPickerButton key={`button${number}`} number={number} /></td>
        })}
      </tr>
    </table>
  </div>
);

export default pinPicker;