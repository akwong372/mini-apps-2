import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.chartRef = React.createRef();
  }

  render() {

    return (
      <div>
        <canvas ref={(c) => {const thing = this.chartRef = c.getContext('2d'); console.log(thing)}} id='chartCanvas' width='400' height='400'></canvas>
        test app
      </div>
    )
  }
}

export default App;