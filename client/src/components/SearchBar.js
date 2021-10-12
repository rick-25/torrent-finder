import '../styles/SearchBar.css'

function SearchBar(props) {
	return (
		<div id="search-bar">
				<img 
					src="./search-solid.svg"
					alt="Search"
				/>
				<input 
					type="text" 
					placeholder="Enter torrent name e.g Gta V" 
					name="searchkey" 
					onChange={(e) => props.syncInputValue(e.target.value)}
				/>
		</div>
	);
}
export default SearchBar;