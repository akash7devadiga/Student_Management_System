import {useState, useEffect, useRef} from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate, Link} from "react-router-dom";




export default function Login()
{
	const rEmail = useRef();
	const nav = useNavigate();

	useEffect(()=>{
		let un = localStorage.getItem("un");
		if (un!=null)
			nav("/home")
	}, []);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	

	const hEmail = (event) => {setEmail(event.target.value);}
	const hPassword = (event) => {setPassword(event.target.value);}

	const login = (event) => {
		event.preventDefault();
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
		.then(res => {
			alert("Logged in successfully!");
			localStorage.setItem("un", email)
			nav("/")
		})
		.catch(err => {
				alert("Invalid credentials " +err)
				setEmail("");
				setPassword("");
				rEmail.current.focus();
		});
	}
	
	return(
		<>
			
					<span className = "title">Log in</span><br/>
						<form onSubmit = {login}>
							<input type = "email" placeholder = "Enter your email" value = {email} onChange = {hEmail} ref = {rEmail}  />
							<input type = "password" placeholder = "Enter your password" value = {password} onChange = {hPassword} />
							<button>Sign In</button>
						</form>
							<div className = "register-nav-link">
								<p>You don't have an account? <Link to = "/register">Register</Link></p>
							</div>
							<div className = "login-nav-link">
								<p><Link to = "/fp">Forgot your password?</Link></p>
							</div>
				
		</>
	);

}