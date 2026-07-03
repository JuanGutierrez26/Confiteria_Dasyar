import { Link } from "react-router-dom";
import "./home.css";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import AboutUs from "./Components/AboutUs";

function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<AboutUs />
		</>
	);
}

export default Home;
