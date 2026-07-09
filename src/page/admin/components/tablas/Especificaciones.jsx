import { BsEye, BsPencil, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import {
	obtenerEspecificaciones,
	crearEspecificacion,
	actualizarEspecificacion,
	eliminarEspecificacion,
} from "../../../../api/productos/especificaciones";

import { useState } from "react";

function TableEspecificaciones({ producto, setProducto }) {
	const [modoEdicion, setModoEdicion] = useState(false);
	const [especificacionActual, setEspecificacionActual] = useState({
		titulo: "",
		descripcion: "",
	});

	const [especificacionEliminar, setEspecificacionEliminar] = useState(null);

	const cargarEspecificaciones = async () => {
		try {
			const data = await obtenerEspecificaciones(producto.detalle.id);

			setProducto?.((prev) => ({
				...prev,
				especificaciones: data,
			}));
		} catch (error) {
			console.error("Error cargando especificaciones:", error);
		}
	};

	const handleCrear = () => {
		setModoEdicion(false);

		setEspecificacionActual({
			titulo: "",
			descripcion: "",
		});
	};

	const handleEditar = (especificacion) => {
		setModoEdicion(true);

		setEspecificacionActual({
			id: especificacion.id,
			titulo: especificacion.titulo,
			descripcion: especificacion.descripcion,
		});
	};

	const handleGuardar = async () => {
		try {
			if (modoEdicion) {
				await actualizarEspecificacion(especificacionActual.id, especificacionActual);
			} else {
				await crearEspecificacion(producto.detalle.id, especificacionActual);
			}

			// Actualiza la tabla desde la BD
			await cargarEspecificaciones();

			const modal = window.bootstrap.Modal.getOrCreateInstance(
				document.getElementById("modalEspecificacion"),
			);

			modal.hide();
		} catch (error) {
			console.error(error);
		}
	};

	const handleEliminar = async () => {
		if (!especificacionEliminar) return;

		try {
			await eliminarEspecificacion(especificacionEliminar.id);

			// Actualiza la tabla desde la BD
			await cargarEspecificaciones();

			setEspecificacionEliminar(null);

			const modal = window.bootstrap.Modal.getOrCreateInstance(
				document.getElementById("modalEliminarEspecificacion"),
			);

			modal.hide();
		} catch (error) {
			console.error("Error eliminando especificación:", error);
		}
	};

	return (
		<>
			<div className="mt-4">
				<div className="titule__Btn mb-3">
					<h5 className="mb-0">Especificaciones</h5>
					<button
						type="button"
						className="btn btn-dark btn-sm btn__Agregar"
						data-bs-toggle="modal"
						data-bs-target="#modalEspecificacion"
						onClick={handleCrear}
					>
						<FaPlus />
						Agregar
					</button>
				</div>

				<div className="table-responsive">
					<table className="table table-hover table-striped">
						<thead className="table-dark">
							<tr>
								<th scope="col" width="10%">
									#
								</th>
								<th scope="col">Especificación</th>
								<th scope="col">Descripción</th>
								<th scope="col" className="acciones">
									Opciones
								</th>
							</tr>
						</thead>

						<tbody>
							{producto.especificaciones?.length > 0 ? (
								producto.especificaciones.map((especificacion, index) => (
									<tr key={especificacion.id}>
										<td>{index + 1}</td>
										<td>
											<strong>{especificacion.titulo}</strong>
										</td>
										<td>{especificacion.descripcion}</td>
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
															data-bs-toggle="modal"
															data-bs-target="#modalEspecificacion"
															onClick={() => handleEditar(especificacion)}
														>
															<BsPencil className="me-2" />
															Editar
														</button>
													</li>

													<li>
														<button
															className="dropdown-item text-danger"
															type="button"
															data-bs-toggle="modal"
															data-bs-target="#modalEliminarEspecificacion"
															onClick={() => setEspecificacionEliminar(especificacion)}
														>
															<BsTrash className="me-2" />
															Eliminar
														</button>
													</li>
												</ul>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="3" className="text-center text-muted">
										No hay especificaciones registradas
									</td>
								</tr>
							)}
						</tbody>
					</table>

					{/* Modal Guardar y Editar */}
					<div className="modal fade" id="modalEspecificacion" tabIndex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">
										{modoEdicion ? "Editar especificación" : "Agregar especificación"}
									</h5>

									<button className="btn-close" data-bs-dismiss="modal" />
								</div>

								<div className="modal-body">
									<label className="form-label">Título</label>

									<input
										className="form-control mb-3"
										value={especificacionActual.titulo}
										onChange={(e) =>
											setEspecificacionActual({
												...especificacionActual,
												titulo: e.target.value,
											})
										}
									/>

									<label className="form-label">Descripción</label>

									<textarea
										className="form-control"
										rows="3"
										value={especificacionActual.descripcion}
										onChange={(e) =>
											setEspecificacionActual({
												...especificacionActual,
												descripcion: e.target.value,
											})
										}
									/>
								</div>

								<div className="modal-footer">
									<button className="btn btn-secondary" data-bs-dismiss="modal">
										Cancelar
									</button>

									<button className="btn btn-primary" onClick={handleGuardar}>
										{modoEdicion ? "Actualizar" : "Guardar"}
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Modal Eliminar */}
					<div className="modal fade" id="modalEliminarEspecificacion" tabIndex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Eliminar especificación</h5>
								</div>

								<div className="modal-body">
									¿Eliminar la especificación
									<strong> {especificacionEliminar?.titulo}</strong>?
								</div>

								<div className="modal-footer">
									<button className="btn btn-secondary" data-bs-dismiss="modal">
										Cancelar
									</button>

									<button className="btn btn-danger" onClick={handleEliminar}>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TableEspecificaciones;
