import { useEffect, useState } from "react";
import TableEspecificaciones from "./tablas/Especificaciones";
import TableDetalleInfo from "./tablas/DetalleInfo";

function DetalleProducto({ producto, onVolver }) {
	const [productoDetalle, setProductoDetalle] = useState(producto);

	useEffect(() => {
		setProductoDetalle(producto);
	}, [producto]);

	if (!productoDetalle) {
		return null;
	}

	return (
		<div>
			<div className="title-btn">
				<h4>{productoDetalle.detalle.titulo}</h4>
				<button type="button" className="btn btn-return mb-3" onClick={onVolver}>
					← Volver
				</button>
			</div>
			<p className="text-muted">
				{productoDetalle.detalle.descripcion_larga || productoDetalle.detalle.descripcion_corta}
			</p>

			<div className="infoGeneral"></div>

			<div className="row g-3">
				<div className="col-md-8">
					<div className="card p-3">
						<p className="mb-1">
							<strong>ID:</strong> {producto.detalle.id || producto.detalle.producto_id}
						</p>
						<p className="mb-1">
							<strong>Precio:</strong> S/ {producto.detalle.precio}
						</p>
						<p className="mb-1">
							<strong>Estrellas:</strong> {producto.detalle.estrellas}/5
						</p>
						<p className="mb-1">
							<strong>Stock:</strong> {producto.detalle.stock}
						</p>
						{producto.detalle.imagen_principal ? (
							<p className="mb-0">
								<strong>Imagen:</strong> {producto.detalle.imagen_principal}
							</p>
						) : null}
					</div>
				</div>
				<div className="col-md-4 co">
					<img src={productoDetalle.detalle.imagen_principal} alt="Imagen del producto" />
				</div>
			</div>
			<TableEspecificaciones producto={productoDetalle} setProducto={setProductoDetalle} />
			<TableDetalleInfo producto={productoDetalle} setProducto={setProductoDetalle} />
		</div>
	);
}

export default DetalleProducto;
