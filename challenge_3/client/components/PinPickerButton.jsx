import React from 'react';

const pinPickerButton = (props) => (
  <div>
    <button type="button" onClick={(e) => {e.persist(); props.pinSelect(e)}} value={props.number}>
      Button #{props.number}
    </button>
  </div>
);

export default pinPickerButton;