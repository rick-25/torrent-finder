

import React from 'react';

import Form from './components/Form';
import ResultBox from './components/ResultBox';
import Loader from './components/Loader';
import Popup from './components/Popup';


const SEARCH_PARAM = "s";



//Statefull class component
class App extends React.Component {

  //Sync value of components's state with input field 
  syncInputValue(newsearchKey) {
    this.setState({ inputValue: newsearchKey });
  }

  executeSearch() {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set(SEARCH_PARAM, this.state.inputValue);
    this.setState({
      ...this.state,
      searchKey: this.state.inputValue,
    })

    history.pushState({}, null, `/?${urlParams.toString()}`);
  }


  //AJAX  api call for torrent data
  apiCall() {
    const key = this.state.searchKey;
    fetch(this.getSearchUrl(this.endpoint, key))
      .then(res => res.json())
      .then(data => this.setState({ torrentData: data }))
      .catch((error) => {
        this.setState({ searchKey: null, torrentData: null });
        alert(error);
      })
  }
  getSearchUrl(endpoint, key) {
    return `${endpoint}search?key=${key}`;
  }


  //Recives the index of row which uder clicked for download
  clickedRow = (index) => {
    this.setState({
      selectedRow: index
    });
  }


  //Component class constructor
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      searchKey: null,
      torrentData: null
    };
    this.endpoint = import.meta.env.VITE_SERVER_URL || "/";
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchKey = urlParams.get(SEARCH_PARAM);

    if (searchKey) {
      this.setState({
        ...this.state,
        searchKey,
        torrentData: null,
        inputValue: searchKey,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchKey && this.state.searchKey != prevState.searchKey) {
      this.setState({
        ...this.state,
        torrentData: null,
      })
      this.apiCall();
    }
  }

  render() {
    const blurStyle = {
      filter: 'blur(5px)'
    };
    const showPopup = ((this.state.selectedRow != null) && this.state.torrentData);

    return (
      <div
        className="app"
        onKeyUp={(event) => { if (event.key === 'Enter') this.executeSearch(); }}
      >
        {
          (showPopup) ?
            <Popup
              magnetLink={this.state.torrentData[this.state.selectedRow].magnet}
              hidePopup={() => this.setState({ selectedRow: null })}
            />
            : null
        }
        <div style={showPopup ? blurStyle : null} >
          <Form
            searchText={this.state.inputValue}
            executeSearch={() => this.executeSearch()}
            syncInputValue={(key) => this.syncInputValue(key)}
          />
          {
            (this.state.torrentData) ?
              <ResultBox
                searchKey={this.state.searchKey}
                torrentData={this.state.torrentData}
                sendIndex={(index) => this.clickedRow(index)}
              />
              : (this.state.searchKey) ? <Loader /> : null
          }
        </div>
      </div>
    )
  }
}

export default App;
