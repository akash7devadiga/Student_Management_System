import {useState, useEffect, useRef} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar.js";

export default function Update()
{
	 const rRno = useRef();
  	 const nav = useNavigate();
	 const loc = useLocation();
         const [rno, setRno] = useState("");
         const [name, setName] = useState("");
         const [marks, setMarks] = useState("");
         const [feedback, setFeedback] = useState("excellent");



	  const hRno = (event) => {setRno(event.target.value)}
          const hName = (event) => {setName(event.target.value)}
          const hMarks = (event) => {setMarks(event.target.value)}
          const hFeedback = (event) => {setFeedback(event.target.value);}

	useEffect(()=>{
		setRno(loc.state.rno)
		setName(loc.state.name)
		setMarks(loc.state.marks)
		
	}, [])

	const save = (event) => {
		event.preventDefault();	
		let url = "http://localhost:9000/modify";
		let data = {rno, name, marks, feedback};
		axios.put(url, data)
		.then(res=>{
			if (res.data.affectedRows === 1)
			{
				alert("Record updated Successfully");
				nav("/");
			}

		})
		.catch(err=>{
			console.log(err);
		});
	}
	return(
		<>
			<Navbar/>
			
				<div className = "formContain">
					<div className = "formWrap">
					<span className = "title">Update student</span><br/>

				<form>
					<input type = "number" placeholder="Enter the roll no" onChange = {hRno} value = {rno} ref = {rRno} disabled = {true}/>
          				<br></br><br></br>
        				<input type = "text" placeholder="Enter the name" onChange = {hName} value = {name} /><br/><br/>
          				<input type = "number" placeholder="Enter the marks" onChange = {hMarks} value = {marks}  /><br/><br/>
				<div className="wrapper-class">
          				<input type = "radio" name = "f" value = "excellent" defaultChecked = {true} checked = {feedback === "excellent"} onChange = {hFeedback}/>Excellent
          				<input type = "radio" name = "f" value = "good" onChange={hFeedback}/>Good
          				<input type = "radio" name = "f" value = "work hard" onChange={hFeedback}/>Work hard<br/>
				</div>
					<br/>
					<button onClick = {save}>Update</button><br/>
					<button onClick = {() => nav("/")}>Back</button>
				</form>
			</div>
			</div>
		</>
	);

}