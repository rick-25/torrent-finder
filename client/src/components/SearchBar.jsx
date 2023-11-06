import '../styles/SearchBar.css'
import icon from '../assets/search-solid.svg'

function SearchBar(props) {
	return (
		<div id="search-bar">
				<img 
					src={icon}
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