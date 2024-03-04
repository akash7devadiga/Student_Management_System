import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./create.scss";
import Navbar from "./Navbar.js";
export default function Create()
{
  const rRno = useRef();
  const nav = useNavigate();
  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("excellent");

  

  const hRno = (event) => {setRno(event.target.value)}
  const hName = (event) => {setName(event.target.value)}
  const hMarks = (event) => {setMarks(event.target.value)}
  const hFeedback = (event) => {setFeedback(event.target.value);}

	const save = (event) => {
		event.preventDefault();
		if(rno.length === "")
		{
			alert("Rno cannot be empty!");
			setRno("");
			setName("");
			setMarks("");
			setFeedback("excellent");
			rRno.current.focus();
			return;

		
		}
		 if(rno < 0)
		{
			alert("Rno cannot be negative!");
			setRno("");
			setName("");
			setMarks("");
			setFeedback("excellent");
			rRno.current.focus();
			return;


		}
		 if((! name.match(/^[A-Za-z ]+$/)) || (name.trim().length == 0) )
		{
			alert("Invalid name! Name can only contain alphabets");	
			setRno("");
			setName("");
			setMarks("");
			setFeedback("excellent");
			rRno.current.focus();
			return;
		}
		 if (name.length == "")
		{
			alert("Name cannot be empty!");
			setRno("");
			setName("");
			setMarks("");
			setFeedback("excellent");
			rRno.current.focus();
			return;

		}
		 if (name.length < 2)
		{
			alert("Name should contain atleast two alphabets!");
			setRno("");
			setName("");
			setMarks("");
			setFeedback("excellent");
			rRno.current.focus();
			return;
		}
		 if ((marks<0) || (marks>100))
		{
			alert("Marks can only be be in the range 0 to 100")
			setRno("");
			setName("");
			setMarks("");
			setFeedback("excellent");
			rRno.current.focus();
			return;

		}
		 if (marks.length == "")
		{
			alert("Marks cannot be empty!");
			setRno("");
			setName("");
			setMarks("");
			setFeedback("excellent");
			rRno.current.focus();
			return;

		}
		let data = {rno, name, marks, feedback};
		let url = "http://localhost:9000/save";
		axios.post(url, data)
		.then(res=>{
			if(res.data.affectedRows === 1)
			{
				alert("Record added successfully")
				setRno("");
				setName("");
				setMarks("");
				setFeedback("excellent");
				rRno.current.focus();
			}
			else if (res.data.code === "ER_DUP_ENTRY")
			{
				alert("Record already exists");
				setRno("");
				setName("");
				setMarks("");
				setFeedback("excellent");
				rRno.current.focus();

			}
		})
		.catch(err => alert("Some issue occured " + err));
	}

  useEffect(()=>{
		let u = localStorage.getItem("un");
		if(u == null)
			nav("/login");
	}, [])

	
  return(
    <>
		<Navbar/>
      

			<div className = "formContain">
					<div className = "formWrap">
					<span className = "title">Create student</span><br/>
        <form>
	
          	<input type = "number" placeholder="Enter the roll no" onChange = {hRno} value = {rno} ref = {rRno}/>
	  
          		<br></br><br></br>
          	<input type = "text" placeholder="Enter the name" onChange = {hName} value = {name} />
		
			<br/><br/>
         	<input type = "number" placeholder="Enter the marks" onChange = {hMarks} value = {marks} />
			<br/><br/>
				<div className="wrapper-class">
						<input type = "radio" name = "f" value = "excellent" defaultChecked = {true}
          	checked = {feedback === "excellent"} onChange = {hFeedback}/>Excellent
          	<input type = "radio" name = "f" value = "good" onChange={hFeedback}/>Good
          	<input type = "radio" name = "f" value = "work hard" onChange={hFeedback}/>Work hard
				</div>
					<br/>
					<button onClick = {save}>Create</button><br/>
          <button onClick = {()=> nav("/home")}>Back</button>
				
          
        </form>
      	</div>
	</div>
    </>
  );
}