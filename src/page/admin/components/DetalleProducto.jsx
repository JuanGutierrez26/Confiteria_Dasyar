function DetalleProducto({ producto, onVolver }) {
	if (!producto) {
		return null;
	}

	return (
		<div>
			<div className="title-btn">
				<h4>{producto.titulo}</h4>
				<button type="button" className="btn btn-return mb-3" onClick={onVolver}>
					← Volver
				</button>
			</div>
			<p className="text-muted">{producto.descripcion_larga || producto.descripcion_corta}</p>

            <div className="infoGeneral">

            </div>

			<div className="row g-3">
				<div className="col-md-6">
					<div className="card p-3">
						<p className="mb-1">
							<strong>ID:</strong> {producto.id || producto.producto_id}
						</p>
						<p className="mb-1">
							<strong>Precio:</strong> S/ {producto.precio}
						</p>
						<p className="mb-1">
							<strong>Estrellas:</strong> {producto.estrellas}/5
						</p>
						<p className="mb-1">
							<strong>Stock:</strong> {producto.stock}
						</p>
						{producto.imagen_principal ? (
							<p className="mb-0">
								<strong>Imagen:</strong> {producto.imagen_principal}
							</p>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetalleProducto;
