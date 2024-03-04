import {useState, useRef} from "react";
import {useNavigate, Link} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import "./style.scss";


export default function Register()
{
	const rEmail = useRef();
	const nav = useNavigate();
	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const hEmail = (event) => {setEmail(event.target.value);}
	const hPassword1 = (event) => {setPassword1(event.target.value);}
	const hPassword2 = (event) => {setPassword2(event.target.value);}
	
	const register = (event) => {
		event.preventDefault();
		if((email === "") || (password1 === "") || (password2 === ""))
		{
			alert("All fields are mandatory!");
			setEmail("");	
			setPassword1("");
			setPassword2("");
			rEmail.current.focus();
			return;
		}
		if (password1 === password2)
		{
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, email, password1)
			.then(res => {alert("Successfully registered!")
					nav("/login")
					})	
			.catch(err => alert("Issue! Email already in use. " ));
		}

		else
		{
			alert("Passwords do not match!");
			
		}

	}
	
	return(
		<>
			
				
					<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Register</span><br/>
						<form onSubmit = {register}>
							
							<input type = "email" placeholder = "Enter your email" onChange = {hEmail} value = {email} ref = {rEmail} />
							<input type = "password" placeholder = "Enter your password" onChange = {hPassword1} value = {password1}/>
							<input type = "password" placeholder = "Confirm your password" onChange = {hPassword2} value = {password2}/>
							<button>Sign Up</button>
						</form>
							<div className = "register-nav-link">
								<p>Already have an account?<Link to = "/login"> Login</Link></p>
							</div>
				
			</div>
			</div>

		</>
	);
		
}