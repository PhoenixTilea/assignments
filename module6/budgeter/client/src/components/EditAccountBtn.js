import React, { useContext, useRef } from "react";
import ModalDisplayContext from "../context/ModalDisplayContext";
import AccContext from "../context/AccContext";
import AccForm from "./AccForm";

export default function EditAccountBtn(props) {
	const { account } = props;
	const { updateAccount } = useContext(AccContext);
	const { openModal, closeModal } = useContext(ModalDisplayContext);
	const btn = useRef(null);
	
	const handleModalOpen = () => {
	const header = <h1>{`Edit ${account.name}`}</h1>;
	const body = <AccForm update={handleUpdate} {...account}/>;
	const footer = null;
	const close = () => {
		btn.current.focus();
	};
	
	openModal(header, body, footer, close);
	};
	
	const handleUpdate = data => {
		updateAccount(account._id, data);
		closeModal();
	};
	
	return (
		<button onClick={handleModalOpen} title={`Edit ${account.name}`} ref={btn}>
			Edit
		</button>
	);
}