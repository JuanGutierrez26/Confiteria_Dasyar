import { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsEye, BsTrash } from "react-icons/bs";
import { obtenerProductosAdmin } from "../../../api/productos/producto";

function ProductosAdmin({ onVerProducto }) {
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const cargarProductos = async () => {
			try {
				const data = await obtenerProductosAdmin();
				setProductos(data);
			} catch (err) {
				setError("No se pudieron cargar los productos.");
			} finally {
				setLoading(false);
			}
		};

		cargarProductos();
	}, []);

	return (
		<>
			<h3>Productos</h3>
			<p>Ingrese los productos que van aparecer en el catálogo</p>

			{loading && <p>Cargando productos...</p>}
			{error && <p className="text-danger">{error}</p>}

			{!loading && !error && (
				<table className="table table-striped">
					<thead>
						<tr className="table-dark">
							<th scope="col">#</th>
							<th scope="col">Titulo</th>
							<th scope="col">Etiqueta</th>
							<th scope="col">Precio</th>
							<th scope="col">Estrellas</th>
							<th scope="col">Estado</th>
							<th scope="col" className="acciones">
								Opciones
							</th>
						</tr>
					</thead>
					<tbody>
						{productos.map((producto, index) => (
							<tr key={producto.id || index}>
								<th scope="row">{index + 1}</th>
								<td>{producto.titulo}</td>
								<td>{producto.etiqueta}</td>
								<td>{producto.precio}</td>
								<td>{producto.estrellas}/5</td>
								<td>{producto.isActive ? "Activo" : "Inactivo"}</td>
								<td className="acciones">
									<div className="dropdown">
										<button
											className="btn btn-transparent p-0"
											type="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<BsThreeDotsVertical size={18} />
										</button>
										<ul className="dropdown-menu">
											<li>
												<button
													className="dropdown-item"
													type="button"
													onClick={() => onVerProducto(producto)}
												>
													<BsEye className="me-2" /> Ver
												</button>
											</li>
											<li>
												<button className="dropdown-item text-danger" type="button">
													<BsTrash className="me-2" /> Eliminar
												</button>
											</li>
										</ul>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
}

export default ProductosAdmin;
