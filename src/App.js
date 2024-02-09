import React, { useState } from "react";
import Contact  from "./components/Contact";
import  Home  from "./components/Home";
import "./App.css";

function App() {
	const [activeTab, setActiveTab] = useState("Home");

	return (
		<>
			<header>
				<div
					className={`header-tab ${activeTab === "Home" ? "active" : ""}`}
					onClick={() => {
						setActiveTab("Home");
					}}
				>
					Home
				</div>
				<div
					className={`header-tab ${activeTab === "Contact" ? "active" : ""}`}
					onClick={() => {
						setActiveTab("Contact");
					}}
				>
					Contact
				</div>
			</header>
			<div className="divider"></div>

			<main>
				{activeTab === "Home" ? <Home /> : <Contact /> }


			</main>

			<footer>
				
				<ul>
					<li>About Us </li>
					<li>Careers </li>
					<li>Request a Demo </li>
				</ul>
				<div className="footer-bottom">© 2024 ListIt, Inc.
Footer navigation
Terms
Privacy
Security
</div>
			</footer>
		</>
	);
}

export default App;
