import React, { useState, useRef } from "react";

export default function Contact() {
	const [inputs, setInputs] = useState({fullname: "", phone: "", desc: ""});
	const [pName, setPName] = useState("");
	const nameRef = useRef(null);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setPName(inputs.fullname);
		setInputs({fullname: "", phone: "", desc: ""});
		nameRef.current.focus();
	};
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs(prevInputs => ({...prevInputs, [name]: value }));
	};
	
	return (
		<>
			<h1>Contact Us</h1>
			<p>{pName ? `Thanks, ${pName}. We'll be in touch with you shortly.` :
			"Give us your information below along with a description of your issue."}
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					<strong>Name: </strong>
					<input type="text" name="fullname" ref={nameRef} value={inputs.fullname} required onChange={handleChange} />
				</label>
				<label>
					<strong>Phone: </strong>
					<input type="tel" name="phone" value={inputs.phone} required onChange={handleChange} />
				</label>
				<label>
					<strong>Description of your issue: </strong>
					<textarea name="desc">
					{inputs.desc}
					</textarea>
				</label>
				<button>Submit</button>
			</form>
		</>
	);
}