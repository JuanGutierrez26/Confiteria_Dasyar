import { BsPencil, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import {
	obtenerInformacion,
	crearInformacion,
	actualizarInformacion,
	eliminarInformacion,
} from "../../../../api/productos/detalleInfo";

import { useState } from "react";

function TableDetalleInfo({ producto, setProducto }) {
	const [modoEdicion, setModoEdicion] = useState(false);

	const [informacionActual, setInformacionActual] = useState({
		tipo: "",
		contenido: "",
		orden: 1,
	});

	const [informacionEliminar, setInformacionEliminar] = useState(null);

	const cargarInformacion = async () => {
		try {
			const data = await obtenerInformacion(producto.detalle.id);

			setProducto((prev) => ({
				...prev,
				informacion: data,
			}));
		} catch (error) {
			console.error("Error cargando información:", error);
		}
	};

	const handleCrearInfo = () => {
		setModoEdicion(false);

		setInformacionActual({
			tipo: "",
			contenido: "",
			orden: 1,
		});
	};

	const handleEditarInfo = (informacion) => {
		setModoEdicion(true);

		setInformacionActual({
			id: informacion.id,
			tipo: informacion.tipo,
			contenido: informacion.contenido,
			orden: informacion.orden ?? 1,
		});
	};

	const handleGuardarInfo = async () => {
		try {
			const payload = {
				tipo: informacionActual.tipo,
				contenido: informacionActual.contenido,
				orden: Number(informacionActual.orden || 1),
			};

			if (modoEdicion) {
				await actualizarInformacion(informacionActual.id, payload);
			} else {
				await crearInformacion(producto.detalle.id, payload);
			}

			await cargarInformacion();

			const modal = window.bootstrap.Modal.getOrCreateInstance(
				document.getElementById("modalInformacion"),
			);

			modal.hide();
		} catch (error) {
			console.error(error);
		}
	};

	const handleEliminarInfo = async () => {
		if (!informacionEliminar) return;

		try {
			await eliminarInformacion(informacionEliminar.id);

			await cargarInformacion();

			setInformacionEliminar(null);

			const modal = window.bootstrap.Modal.getOrCreateInstance(
				document.getElementById("modalEliminarInformacion"),
			);

			modal.hide();
		} catch (error) {
			console.error("Error eliminando información:", error);
		}
	};

	return (
		<>
			<div className="mt-4">
				<div className="titule__Btn mb-3">
					<h5 className="mb-0">Detalle Información</h5>
					<button
						type="button"
						className="btn btn-dark btn-sm btn__Agregar"
						data-bs-toggle="modal"
						data-bs-target="#modalInformacion"
						onClick={handleCrearInfo}
					>
						<FaPlus />
						Agregar
					</button>
				</div>

				<div className="table-responsive">
					<table className="table table-hover table-striped">
						<thead className="table-dark">
							<tr>
								<th width="10%">Orden</th>

								<th>Tipo</th>

								<th>Contenido</th>

								<th className="acciones">Opciones</th>
							</tr>
						</thead>

						<tbody>
							{producto.informacion?.length > 0 ? (
								producto.informacion.map((info, index) => (
									<tr key={info.id}>
										<td>{info.orden}</td>

										<td>
											<strong className="text-capitalize">{info.tipo}</strong>
										</td>

										<td>
											{info.tipo === "imagen" ? (
												<a
													href={info.contenido}
													target="_blank"
													rel="noopener noreferrer"
													className="badge bg-primary text-decoration-none"
												>
													{info.contenido}
												</a>
											) : (
												info.contenido
											)}
										</td>

										<td className="acciones">
											<div className="dropdown">
												<button
													className="btn btn-transparent p-0"
													type="button"
													data-bs-toggle="dropdown"
												>
													<BsThreeDotsVertical size={18} />
												</button>

												<ul className="dropdown-menu">
													<li>
														<button
															className="dropdown-item"
															data-bs-toggle="modal"
															data-bs-target="#modalInformacion"
															onClick={() => handleEditarInfo(info)}
														>
															<BsPencil className="me-2" />
															Editar
														</button>
													</li>

													<li>
														<button
															className="dropdown-item text-danger"
															data-bs-toggle="modal"
															data-bs-target="#modalEliminarInformacion"
															onClick={() => setInformacionEliminar(info)}
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
									<td colSpan="4" className="text-center text-muted">
										No hay información registrada
									</td>
								</tr>
							)}
						</tbody>
					</table>

					{/* Modal Guardar y Editar */}
					<div className="modal fade" id="modalInformacion" tabIndex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">
										{modoEdicion ? "Editar Información" : "Agregar Información"}
									</h5>

									<button className="btn-close" data-bs-dismiss="modal" />
								</div>

								<div className="modal-body">
									<label className="form-label">Tipo</label>
									<select
										className="form-control mb-3"
										value={informacionActual.tipo}
										onChange={(e) =>
											setInformacionActual({
												...informacionActual,
												tipo: e.target.value,
											})
										}
									>
										<option value="">Seleccione un tipo</option>
										<option value="texto">Texto</option>
										<option value="imagen">Imagen</option>
									</select>
									<label className="form-label">Contenido</label>
									<textarea
										className="form-control"
										rows="3"
										value={informacionActual.contenido}
										onChange={(e) =>
											setInformacionActual({
												...informacionActual,
												contenido: e.target.value,
											})
										}
									/>

									<label className="form-label">Orden</label>
									<input
										className="form-control mb-3"
										value={informacionActual.orden}
										onChange={(e) =>
											setInformacionActual({
												...informacionActual,
												orden: Number(e.target.value),
											})
										}
									/>
								</div>

								<div className="modal-footer">
									<button className="btn btn-secondary" data-bs-dismiss="modal">
										Cancelar
									</button>

									<button className="btn btn-primary" onClick={handleGuardarInfo}>
										{modoEdicion ? "Actualizar" : "Guardar"}
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Modal Eliminar */}
					<div className="modal fade" id="modalEliminarInformacion" tabIndex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Eliminar especificación</h5>
								</div>

								<div className="modal-body">
									¿Eliminar la especificación
									<strong> {informacionEliminar?.titulo}</strong>?
								</div>

								<div className="modal-footer">
									<button className="btn btn-secondary" data-bs-dismiss="modal">
										Cancelar
									</button>

									<button className="btn btn-danger" onClick={handleEliminarInfo}>
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

export default TableDetalleInfo;
