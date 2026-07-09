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
		titulo: "",
		descripcion: "",
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

	const handleCrear = () => {
		setModoEdicion(false);

		setInformacionActual({
			titulo: "",
			descripcion: "",
		});
	};

	const handleEditar = (informacion) => {
		setModoEdicion(true);

		setInformacionActual({
			id: informacion.id,
			titulo: informacion.titulo,
			descripcion: informacion.descripcion,
		});
	};

	const handleGuardar = async () => {
		try {
			if (modoEdicion) {
				await actualizarInformacion(informacionActual.id, informacionActual);
			} else {
				await crearInformacion(producto.detalle.id, informacionActual);
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

	const handleEliminar = async () => {
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
											<strong>{info.tipo}</strong>
										</td>

										<td>{info.contenido}</td>

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
															onClick={() => handleEditar(info)}
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
				</div>
			</div>
		</>
	);
}

export default TableDetalleInfo;
