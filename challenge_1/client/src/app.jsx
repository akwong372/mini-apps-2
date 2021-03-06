import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import SearchBar from './components/SearchBar.jsx';
import EventItem from './components/eventItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataPerPage: 10,
      currPage: 1
    }
    this.pageChange = this.pageChange.bind(this);
    this.searchDataFromServer = this.searchDataFromServer.bind(this);
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

  searchDataFromServer(e) {
    e.preventDefault();
    const searchTerm = e.target[0].value;
    if (searchTerm !== '') {
      e.target[0].value = '';
      axios.get(`/events?q=${searchTerm}`)
        .then((response) =>
          this.setState({
            data: response.data,
            pageCount: Math.ceil(response.headers["x-total-count"] / this.state.dataPerPage)
          })
        )
        .catch((err) => console.log('Error occurred: ', err))
    } else {
      this.getDataFromServer();
    }
  }

  pageChange(data) {
    var nextPage = data.selected + 1;
    this.setState({ currPage: nextPage }, () => this.getDataFromServer());
  }

  componentDidMount() {
    this.getDataFromServer();
  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <SearchBar className='nav-item' search={this.searchDataFromServer} />
        </nav>
        <div className='container-fluid'>
          <h1 className='text-center'>Historical Events</h1>
          <ul className='list-group'>
            {this.state.data.map((item, i) => {
              return <EventItem key={i} {...item} />
            })}
          </ul>
          <br />
          <nav>
            <ReactPaginate
              pageCount={this.state.pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-dots'}
              onPageChange={this.pageChange}
              containerClassName={'pagination justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </nav>
        </div>

      </div>
    );
  };
};

ReactDOM.render(<App />, document.getElementById('root'));