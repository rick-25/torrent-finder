

function Row(props) {
	return (
		<tr onClick={() => props.sendIndex(props.id)}>
			<td>{props.name}</td>
			<td>{props.size}</td>
		</tr>
	);
}

export default Row;