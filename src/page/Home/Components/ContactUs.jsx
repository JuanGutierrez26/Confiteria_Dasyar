import ContactImage from "../Assets/contactImage.png";

function ContactUs() {
	return (
		<section id="contactanos" className="contact">

			<div className="contact__overlay">

				<div className="contact__container">

					<div className="contact__image">
						<img src={ContactImage} alt="Contacto" />
					</div>

					<div className="contact__content">

						<h2 className="contact__title">
							CONTÁCTANOS
						</h2>

						<form className="contact__form">

							<input
								type="tel"
								placeholder="Teléfono"
							/>

							<input
								type="text"
								placeholder="Nombre"
							/>

							<input
								type="text"
								placeholder="Asunto"
							/>

							<textarea
								placeholder="Mensaje"
								rows="5"
							/>

							<button>
								Enviar
							</button>

						</form>

					</div>

				</div>

			</div>

		</section>
	);
}

export default ContactUs;