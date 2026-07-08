import { Link } from "react-router-dom";
import "./home.css";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import AboutUs from "./Components/AboutUs";
import Catalogo from "./Components/Catalogo";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer";

function Home() {
	

	return (
		<>
			<Navbar />
			<Hero />
			<AboutUs />
			<Catalogo />
			<ContactUs />
			<Footer />
		</>
	);
}

export default Home;
