import { useEffect, useState } from "react";

function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 100);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav className={`navbar fixed-top navbar-expand-lg ${scrolled ? "navbar-scrolled" : ""}`}>
			<div className="container-fluid">
				<a className="navbar-brand navbar__title" href="#">
					Confitería Dasyar
				</a>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarText"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarText">
					<div className="btn__navbar">
						<a className="nav-link" href="#">
							Inicio
						</a>
						<a className="nav-link" href="#">
							Nosotros
						</a>
						<a className="nav-link" href="#">
							Catálogo
						</a>
						<a className="nav-link" href="#">
							Contáctanos
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
