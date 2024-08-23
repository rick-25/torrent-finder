

function Row(props) {
	return (
		<tr onClick={() => props.sendIndex(props.id)}>
			<td><p>{props.name}</p></td>
			<td><p>{props.size}</p></td>
		</tr>
	);
}

export default Row;