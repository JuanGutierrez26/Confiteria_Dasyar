import { Link, useParams } from "react-router-dom";

function ProductDetail() {
	const { id } = useParams();

	return (
		<div style={{ padding: "2rem" }}>
			<h1>Detalle del producto</h1>
			<p>Estás viendo el producto con ID: {id}</p>
			<Link to="/">Volver al inicio</Link>
		</div>
	);
}

export default ProductDetail;
