import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataPerPage: 10,
      currPage: 1
    }
    this.pageChange = this.pageChange.bind(this);
  }

  getDataFromServer() {
    axios.get(`/events?_page=${this.state.currPage}&_limit=${this.state.dataPerPage}`)
      .then((response) => {
        this.setState({
          data: response.data,
          pageCount: Math.ceil(response.headers["x-total-count"] / this.state.dataPerPage)
        })
      })
      .catch((err) => console.log('Error occurred: ', err));
  }

  pageChange(data) {
    var nextPage = data.selected + 1;
    this.setState({
      currPage: nextPage
    }, () => this.getDataFromServer());
  }

  componentDidMount() {
    this.getDataFromServer();
  };

  render() {
    return (
      <div>
        <h1>test</h1>
        {this.state.data.map((item, i) => {
          // console.log(item);
          return <div key={i}>{item.date}</div>
        })}
        <ReactPaginate
          pageCount={this.state.pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-dots'}
          onPageChange={this.pageChange}
          containerClassName={'pagination-container'}
          activeClassName={'active'}
        />
      </div>
    );
  };
};

ReactDOM.render(<App />, document.getElementById('root'));