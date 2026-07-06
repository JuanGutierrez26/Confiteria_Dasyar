import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";

function Footer() {
	return (
		<footer className="footer">

			<div className="footer__container">

				{/* Columna izquierda */}
				<div className="footer__about">

					<h2>Confitería Dasyar</h2>

					<p>
						En Confitería Dasyar transformamos los mejores ingredientes
						en deliciosos dulces que acompañan tus momentos más
						especiales. Descubre nuestra amplia variedad de productos,
						elaborados con pasión, calidad y dedicación para ofrecerte
						una experiencia llena de sabor y tradición.
					</p>

				</div>

				{/* Navegación */}

				<div className="footer__links">

					<a href="#inicio">Inicio</a>
					<a href="#nosotros">Nosotros</a>
					<a href="#catalogo">Catálogo</a>
					<a href="#contactanos">Contáctanos</a>

				</div>

				{/* Legal */}

				<div className="footer__legal">

					<a href="#">Políticas de Privacidad</a>
					<a href="#">Términos y Condiciones</a>

				</div>

				{/* Redes */}

				<div className="footer__social">

					<a
						href="https://www.instagram.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaInstagram />
					</a>

					<a
						href="https://www.tiktok.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaTiktok />
					</a>

					<a
						href="https://www.facebook.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaFacebookF />
					</a>

				</div>

			</div>

			<hr className="footer__line" />

			<p className="footer__copy">
				© 2025 - 2026 All Right Reserved
			</p>

		</footer>
	);
}
export default Footer;