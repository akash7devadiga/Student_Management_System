import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, updatePassword, onAuthStateChanged} from "firebase/auth";
import "./style.scss";

export default function ChangePassword()
{
	const rPassword1 = useRef();
	const nav = useNavigate();
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	
	const hPassword1 = (event) => {setPassword1(event.target.value);}
	const hPassword2 = (event) => {setPassword2(event.target.value);}

	useEffect(()=>{
		let u = localStorage.getItem("un");
		if(u == null)
			nav("/login");
	}, [])

	const change = (event) => {
		event.preventDefault();
		if (password1 === password2)
		{
			const auth = getAuth();
			onAuthStateChanged(auth, (user)=>{
				updatePassword(user, password1)
				.then(res => {
					alert("Password changed successfully");
					localStorage.clear();
					nav("/login");

				})
				.catch(err => {
					alert("Issue " +err)

				});
			})
		}
		else
		{
			alert("Passwords do not match!");
			setPassword1("");
			setPassword2("");
			rPassword1.current.focus();
		}
	}
		
	return(
		<>
			
					<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Forgot Password?</span><br/>
			
				<form>
					<input type = "password" placeholder = "Enter your password" onChange = {hPassword1} value = {password1} ref = {rPassword1}/>
					<input type = "password" placeholder = "Confirm your password" onChange = {hPassword2} value = {password2}/>
					<button onClick = {change}>Change Password</button>
					<button onClick = {()=> nav("/home")}>Back</button>
				</form>	
			</div>
			</div>
		</>
	);

}