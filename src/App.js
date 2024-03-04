import logo from './logo.svg';
import './App.css';
import ForgotPassword from "./ForgotPassword.js";
import ChangePassword from "./ChangePassword.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Create from "./Create.js";
import Home from "./Home.js";
import Update from "./Update.js";
import {app} from "./FirebaseConfig.js";
import About from "./About.js";


import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";


function App() {
  return (
  	<>
		<BrowserRouter>
			
			<Routes>
				<Route path = "/login" element = {<Login/>} />
				<Route path = "/register" element = {<Register/>} />
				<Route path = "/" element = {<Home/>} />
				<Route path = "*" element = {<Navigate to = "/"/>} />
				<Route path = "/cp" element = {<ChangePassword/>} />
				<Route path = "/fp" element = {<ForgotPassword/>} />
				<Route path='/create' element = {<Create/>} />
				<Route path = "/update" element = {<Update/>} />
				<Route path = "/about" element = {<About/>} />
			</Routes>
		</BrowserRouter>
	</>

  );
}

export default App;
