import React from 'react';

const TestComponent = ({ testMessage, testOnClick }) => (
  <button onClick={e => {e.preventDefault(); testOnClick(testMessage)}}>
    {testMessage}
  </button>
);

export default TestComponent;