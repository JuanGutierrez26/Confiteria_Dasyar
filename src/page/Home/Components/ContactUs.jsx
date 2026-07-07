import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactImage from "../Assets/contactImage.png";

function ContactUs() {
	const form = useRef();
	const [status, setStatus] = useState("");
	const [loading, setLoading] = useState(false);

	const sendEmail = (e) => {
		e.preventDefault();

		setLoading(true);

		emailjs
			.sendForm(
				"service_ghz390r",
				"template_ponjfsp",
				form.current,
				"H3u3LCPoWZkPhm4mi"
			)
			.then(() => {
				setStatus("success");
				setLoading(false);

				form.current.reset();

				setTimeout(() => {
					setStatus("");
				}, 4000);
			})
			.catch((error) => {

				console.log(error);

				setStatus("error");
				setLoading(false);

				setTimeout(() => {
					setStatus("");
				}, 4000);
			});
	};
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

						<form 
							className="contact__form"
							ref={form}
							onSubmit={sendEmail}>

							<input
								type="tel"
								name="phone"
								placeholder="Teléfono"
								required
							/>

							<input
								type="text"
								name="name"
								placeholder="Nombre"
								required
							/>

							<input
								type="text"
								name="subject"
								placeholder="Asunto"
								required
							/>

							<textarea
								name="message"
								placeholder="Mensaje"
								rows="5"
								required
							/>

							<button
								type="submit"
								disabled={loading}
							>
								{loading ? "Enviando..." : "Enviar"}
							</button>

							{status === "success" && (
								<p className="contact__success">
									¡Mensaje enviado correctamente!
								</p>
							)}

							{status === "error" && (
								<p className="contact__error">
									No se pudo enviar el mensaje.
								</p>
							)}

						</form>

					</div>

				</div>

			</div>

		</section>
	);
}

export default ContactUs;