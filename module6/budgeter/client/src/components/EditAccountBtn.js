import React, { useContext, useRef, useState } from "react";
import Modal from "./Modal";
import AccContext from "../context/AccContext";
import AccForm from "./AccForm";

export default function EditAccountBtn(props) {
	const { account } = props;
	const { updateAccount } = useContext(AccContext);
	const [showModal, setShowModal] = useState(false);
	const btn = useRef(null);
	
	const handleModalClose = () => {
		setShowModal(false);
		btn.current.focus();
	};
	
	const handleUpdate = data => {
		updateAccount(account._id, data);
		handleModalClose();
	};
	
	return (
		<>
		<button onClick={() => setShowModal(true)} title={`Edit ${account.name}`} ref={btn}>
			Edit
		</button>
		{(showModal) && <Modal onModalClose={handleModalClose}>
				<Modal.Header>
					<h1>{`Edit ${account.name}`}</h1>
				</Modal.Header>
				<Modal.Body>
					<AccForm update={handleUpdate} {...account} />
				</Modal.Body>
				<Modal.Footer>
					<Modal.Footer.CloseBtn>Cancel</Modal.Footer.CloseBtn>
				</Modal.Footer>
			</Modal>
		}
		</>
	);
}