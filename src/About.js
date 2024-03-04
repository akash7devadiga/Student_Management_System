import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar.js";
function About()
{
	const nav = useNavigate();
	return(
		<>
				<Navbar/>
				<center>
				<div className = "about-header">
				<h2>About</h2>
				</div>
				<div className = "about-para">
					<p>This is a simple Student management system full stack web <br/>
						application built using
						ReactJS, ExpressJS and MySQL.
					</p>
				</div>
				<br/><br/>
				<div className = "features-header">
				<h2>Features</h2>
				</div>
				<div className = "about-list">
				<ol style = {{listStyle: 'none'}}>
					<li>Add, view, update and delete users.</li>
					<li>User details are stored in MySQL Database.</li>
					<li>Firebase authentication for email and password logins.</li>
				</ol>
				</div>
				<br/><br/>
				<div className = "contact-header">
				<h2>Contact</h2>
				</div>
				<div className = "about-email" >
				<span>Email: devadigaakash303@gmail.com, Contact: 7045766835</span>
				</div>
				<br/><br/><br/>
				
					<button onClick = {() => {nav("/")}}>Back</button>
				
			</center>
		</>

	);

}
export default About;