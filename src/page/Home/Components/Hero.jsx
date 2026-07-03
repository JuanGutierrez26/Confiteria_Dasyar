function Hero() {
	return (
		<section className="hero">
			<div className="hero__overlay"></div>

			<div className="hero__content">
				<span className="hero__subtitle">DASYAR</span>

				<h1 className="hero__title">CONFITERIA</h1>

				<p className="hero__description">
					Descubre una gran variedad de dulces elaborados con dedicación y calidad. Encuentra el
					sabor perfecto para cada ocasión y conoce todo nuestro catálogo de productos.
				</p>

				<div className="hero__buttons">
					<button className="btn btn-primary">Catálogo</button>
					<button className="btn btn-primary">Contáctanos</button>
				</div>
			</div>
		</section>
	);
}

export default Hero;
