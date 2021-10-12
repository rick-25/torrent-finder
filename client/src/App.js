

import React from 'react';

import Form from './components/Form';
import ResultBox from './components/ResultBox';                 
import Loader from './components/Loader';
import Popup from './components/Popup';



//Statefull class component
class App extends React.Component {

    //Sync value of components's state with input field 
    syncInputValue(newsearchKey) {
        this.setState({ inputValue: newsearchKey });
    }

    executeSearch() {
        this.setState (
            {
                searchKey: this.state.inputValue,
                torrentData: null
            },
            () => this.apiCall()
        )
    }


    //AJAX  api call for torrent data
    apiCall() {
        const key = this.state.searchKey;
        console.log(this.getSearchUrl(this.endpoint, key));
        fetch(this.getSearchUrl(this.endpoint, key))
            .then(res => res.json())
            .then(data => this.setState({ torrentData: data }))
            .catch((error) => {
                this.setState({searchKey: null, torrentData: null});
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
        this.endpoint = "http://torrent-finderz.herokuapp.com/";
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
                        syncInputValue={(key) => this.syncInputValue(key)} executeSearch={() => this.executeSearch()}
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
