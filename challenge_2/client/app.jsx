import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptocurrency: 'BTC',
      convertedCurrency: 'USD',
      dateStart: '2019-01-01',
      dateEnd: '2019-05-01',
      chartType: 'line',
      dataLabels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      dataPts: [12, 19, 3, 5, 2, 3],
      disclaimer: ''
    }

    this.chartRef = React.createRef();
    this.createChart = this.createChart.bind(this);
  }

  createChart() {
    return new Chart(this.ctx, {
      type: this.state.chartType,
      data: {
        labels: this.state.dataLabels,
        datasets: [{
          label: this.state.cryptocurrency,
          data: this.state.dataPts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 0.7)',
          borderWidth: 3,
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          steppedLine: false
        }]
      },
      options: {
        tooltips: {
          intersect: false
        },
        title: {
          display: true,
          fontSize: 20,
          text: `${this.state.cryptocurrency} Prices ${this.state.dateStart} to ${this.state.dateEnd}`
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: `Closing prices (${this.state.convertedCurrency})`,
              fontSize: 14
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  componentDidMount() {
    this.ctx = this.chartRef.current.getContext('2d');
    axios.get(`/timeframe?start=${this.state.dateStart}&end=${this.state.dateEnd}`)
      .then((res) => {
        const parsedRes = JSON.parse(res.data.body);
        this.setState({
          dataLabels: Object.keys(parsedRes.bpi),
          dataPts: Object.values(parsedRes.bpi),
          disclaimer: parsedRes.disclaimer
        });
      })
      .then(() => this.createChart())
      .catch((err) => console.log('Error in axios get ', err));
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} id='chartCanvas' width='1000' height='400'></canvas>
        <br />
        <div>
          <a href="https://www.coindesk.com/price/bitcoin">{this.state.disclaimer}</a>
        </div>
      </div>
    )
  }
}

export default App;