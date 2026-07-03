import { Link } from "react-router-dom";

function Home() {
	return (
		<div style={{ padding: "2rem" }}>
			<h1>Bienvenido a la confitería</h1>
			<p>Esta es la página principal.</p>
			<Link to="/detalleProducto/1">Ver producto 1</Link>
		</div>
	);
}

export default Home;
