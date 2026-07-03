import AboutImage from "../Assets/aboutUs.png";
import MissionImage from "../Assets/mision.png";

function AboutUs() {
	return (
		<section className="about">
			<div className="about__container">
				{/* Primera fila */}
				<div className="about__row">
					<div className="about__content">
						<h2 className="about__title">SOBRE NOSOTROS</h2>

						<div className="about__text">
							<div className="about__line"></div>

							<p>
								En Confitería Dasyar nos dedicamos a la elaboración y comercialización de dulces de
								alta calidad, preparados con dedicación y los mejores ingredientes. Nuestro
								compromiso es ofrecer productos que combinen un excelente sabor, una presentación
								atractiva y una atención cercana, buscando siempre brindar una experiencia agradable
								a cada uno de nuestros clientes. Trabajamos día a día para llevar dulzura a cada
								celebración y momento especial.
							</p>
						</div>
					</div>

					<div className="about__image">
						<img src={AboutImage} alt="Sobre Nosotros" />
					</div>
				</div>

				{/* Segunda fila */}
				<div className="about__row about__row--reverse">
					<div className="about__image">
						<img src={MissionImage} alt="Misión y Visión" />
					</div>

					<div className="about__content">
						<h2 className="about__title">MISIÓN Y VISIÓN</h2>

						<div className="about__text">
							<div className="about__line"></div>

							<p>
								Elaborar y ofrecer productos de confitería de excelente calidad, utilizando
								ingredientes cuidadosamente seleccionados y procesos responsables, brindando un
								servicio amable y satisfaciendo las necesidades de nuestros clientes. Ser una
								confitería reconocida por la calidad de sus productos, la innovación en sus
								creaciones y la confianza de sus clientes, consolidándonos como una de las mejores
								opciones en el mercado y expandiendo nuestra presencia.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AboutUs;
