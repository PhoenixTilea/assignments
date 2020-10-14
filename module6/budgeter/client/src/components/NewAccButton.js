import React, { useRef, useState } from "react";
import Modal from "./Modal";
import NewAccForm from "./NewAccForm";

export default function NewAccButton(props) {
	const [showModal, setShowModal] = useState(false);
	const btn = useRef();
	
	const handleModalClose = () => {
		setShowModal(false);
		btn.current.focus();
	};
	
	const addAccount = data => {
		props.addAccount(data);
		handleModalClose();
	}
	
	return (
		<>
		<button onClick={() => setShowModal(true)} ref={btn}>Add a New Account</button>
		{(showModal) && <Modal onModalClose={handleModalClose}>
				<Modal.Header>Add a New Account</Modal.Header>
				<Modal.Body><NewAccForm add={addAccount} /></Modal.Body>
				<Modal.Footer>
					<Modal.Footer.CloseBtn>Cancel</Modal.Footer.CloseBtn>
				</Modal.Footer>
			</Modal>
		}
		</>
	);
}