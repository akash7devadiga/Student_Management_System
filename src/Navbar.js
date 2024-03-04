import {Link} from "react-router-dom";
export default function Navbar()
{
	return(
		<>
			<div className = "nav">
				<Link to = "/cp">Change password</Link>
				<Link to = "/home">Home</Link>		
				<Link to = "/create">Create</Link>
				<Link to = "/about">About</Link>
			</div>
		</>
	);

}