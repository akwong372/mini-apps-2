import React from 'react';
import PinPickerButton from './PinPickerButton.jsx';

const pinPicker = (props) => (
  <div>
    <table>
      <tbody>
        <tr>
          {[1, 2, 3].map((number) => {
            return <td key={`button${number}`}><PinPickerButton number={number} pinSelect={props.pinSelect} /></td>
          })}
        </tr>
        <tr>
          {[4, 5, 6].map((number) => {
            return <td key={`button${number}`}><PinPickerButton number={number} pinSelect={props.pinSelect} /></td>
          })}
        </tr>
        <tr>
          {[7, 8, 9].map((number) => {
            return <td key={`button${number}`}><PinPickerButton number={number} pinSelect={props.pinSelect} /></td>
          })}
        </tr>
        <tr>
          {[10].map((number) => {
            return <td key={`button${number}`}><PinPickerButton number={number} pinSelect={props.pinSelect} /></td>
          })}
        </tr>
        <tr>
          <td>
            <button type="button" onClick={() => props.pinsBowl()} disabled={props.currFrame > 9 ? true : false}>Bowl</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default pinPicker;