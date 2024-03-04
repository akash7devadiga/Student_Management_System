import {useState, useEffect, useRef} from "react";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {useNavigate} from "react-router-dom";

import "./style.scss";

export default function ForgotPassword()
{
	const nav = useNavigate();
	const rEmail = useRef();
	useEffect(()=>{
		const un = localStorage.getItem("un");
		if (un != null)
			nav("/")
	}, []);
	const [email, setEmail] = useState("");

	const hEmail = (event) => {setEmail(event.target.value);}
	const send = (event) => {
		event.preventDefault();
		if(email === "")
		{
			alert("Email is required! ");
			rEmail.current.focus();
			return;

		}
		const auth = getAuth();
		sendPasswordResetEmail(auth, email)
		.then(res => {
			alert("Please check your email");
			nav("/login")
		})
		.catch(err => alert("issue " +err));

	}

	return(
		<>
			
				<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Forgot Password?</span><br/>
						<form onSubmit = {send}>
							<input type = "email" placeholder = "Enter your registered email"  onChange = {hEmail} value = {email} ref ={rEmail} />
							<button> Reset </button>
							<button onClick = {()=>{nav("/login")}}> Back </button>
						</form>
						
				</div>
				</div>

		</>
	);

}