import React, { useContext, useState } from "react";
import CharacterContext from "../../context/CharacterContext";

export default function CharacterPage() {
	const {chars, addChar, updateChar, deleteChar } = useContext(CharacterContext);
	const [showForm, setShowForm] = useState(false);
	
	return (
		<div id="character-page">
			<h2>My Characters</h2>
			{(showForm) ? <NewCharForm add={addCharacter} hide={() => setShowForm(false)} />
				: <button name="add" onClick={handleClick}>Add New Character</button>
			}
		</div>
	);
}