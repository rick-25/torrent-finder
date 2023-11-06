import '../styles/Form.css';
import SearchBar from './SearchBar';

//Form component
function Form(props) {
	return (
		<div id="form">
			<h1>{"TorrentFinder"}</h1>
			<SearchBar syncInputValue={(data) => props.syncInputValue(data)}/>
			<button onClick={() => props.executeSearch()}>
				<i className="fa fa-send-o"></i>
			</button>
		</div>
	);
}

export default Form;