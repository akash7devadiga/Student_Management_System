import {useLocation, Navigate, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import axios from "axios";
import Navbar from "./Navbar.js";

import "./home.css";

import {useState, useEffect} from "react";

export default function Home () {
	const loc = useLocation();
	const nav = useNavigate();

	const [user, setUser] = useState("");
	const [data, setData] = useState([]);
	const[ans1, setAns1] = useState("");
	const[ans, setAns] = useState("");


	const getQuote = () => {
		let urladd = "https://api.quotable.io/random";
		axios.get(urladd)
		.then(res=>{
			setAns(res.data.content)
			setAns1(res.data.author)
		})
		.catch(err=>alert("issue " +err));
	}
	useEffect(()=>{getQuote(); setInterval(getQuote, 120000)}, []);

	useEffect(()=>{
		let url = "http://localhost:9000/gd";
		axios.get(url)
		.then(res=>setData(res.data))
		.catch(err=>alert("issue " +err));
	}, [])
	
	useEffect(()=>{
		let u = localStorage.getItem("un");
		if (u === null)
		{
			nav("/login");
		}
		else
			setUser(u);

	}, []);

	const delStu = (rno) => {
		let url = "http://localhost:9000/remove";
		axios.delete(url, {data:{rno}})
		.then(res => {
			alert("Record delete successfully")
			window.location.reload();

		})
		.catch();
	}
	const updateStu = (rno, name, marks, feedback) =>{
		nav("/update", {state:{rno, name, marks, feedback}})


	}
	const logOff = (event) => {
		event.preventDefault();
		const auth = getAuth();
		localStorage.clear();
		signOut(auth)
		.then(res => {alert("Logged off successfully!");
			nav("/login");	
		})
		.catch(err => alert("err " + "Some issue occured"));
	}
	return(
		<>
			<Navbar/>
			<center>
				<h2> {ans} </h2>
				<h3>Author - {ans1}</h3>
				
				<h1>Welcome {user}</h1>
				<table border = "5" style = {{"width": "50%"}}>
					<tr>
						<th>Rno</th>
						<th>Name</th>
						<th>Marks</th>
						<th>Feedback</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
					{
						data.map((e)=>(
						<tr style = {{"text-align":"center"}}>
							<td>{e.rno}</td>
							<td>{e.name}</td>
							<td>{e.marks}</td>
							<td>{e.feedback}</td>
							<td><button onClick = {()=>{if(window.confirm("Are you sure?")) delStu(e.rno)}} >Delete</button></td>
						
							<td><button onClick = {()=>{updateStu(e.rno, e.name, e.marks, e.feedback)}}>Update</button></td>
						</tr>
						))	

					}



				</table>
				<br/>
				<form onSubmit = {logOff}>
					<button>Log out</button>
				</form>
			</center>
		</>
	);

}