import React, { useContext, useRef } from "react";
import ModalDisplayContext from "../context/ModalDisplayContext";
import IEContext from "../context/IEContext";
import IEForm from "./components/IEForm";

export default function NewIEButton(props) {
	const { openModal, closeModal } = useContext(ModalDisplayContext);
	const { addIE } = useContext(IEContext);
	const btn = useRef(null);
	
	const handleModalOpen = () => {
	const header = <h1>{`New ${(props.income} ? "Income" : "Expense"}`}</h1>
	const body = <IEForm income={props.income} add={handleAdd} />;
	const footer = null;
	const close = () => {
	btn.current.focus();
	};
	
	openModal(header, body, footer, close);
	};
	
	const handleAdd = data => {
	addIE(data);
	closeModal();
	};
	
	return (
		<button ref={btn} onClick={handleModalOpen}>
			{`Add New ${props.income ? "Income" : "Expense"}`}
		</button>
	);
}