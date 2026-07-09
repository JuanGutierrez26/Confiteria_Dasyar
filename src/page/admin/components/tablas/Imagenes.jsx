import { BsPencil, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import {
	obtenerImagenes,
	crearImagen,
	actualizarImagen,
	eliminarImagen,
} from "../../../../api/productos/imagenes";
import { uploadProductImage } from "../../../../api/upload";

import { useRef, useState } from "react";

function TableImage({ producto, setProducto }) {
	const [modoEdicion, setModoEdicion] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const inputFileRef = useRef(null);

	const [informacionActual, setInformacionActual] = useState({
		url_imagen: "",
		orden: 1,
	});

	const [informacionEliminar, setImgEliminar] = useState(null);

	const cargarInformacion = async () => {
		try {
			const data = await obtenerImagenes(producto.detalle.id);

			setProducto((prev) => ({
				...prev,
				imagenes: data,
			}));
		} catch (error) {
			console.error("Error cargando imágenes:", error);
		}
	};

	// Crear

	const handleCrearImg = () => {
		setModoEdicion(false);
		setImageFile(null);

		setInformacionActual({
			url_imagen: "",
			orden: 1,
		});
	};

	const handleGuardarImg = async () => {
		try {
			let urlImagen = informacionActual.url_imagen;

			if (!urlImagen && imageFile) {
				const response = await handleUploadImage();
				urlImagen = response?.url;
			}

			if (!urlImagen) {
				alert("Debes subir una imagen antes de guardar");
				return;
			}

			const payload = {
				url_imagen: urlImagen,
				orden: Number(informacionActual.orden || 1),
			};

			if (modoEdicion) {
				await actualizarImagen(informacionActual.id, payload);
			} else {
				await crearImagen(producto.detalle.id, payload);
			}

			await cargarInformacion();

			const modal = window.bootstrap.Modal.getOrCreateInstance(
				document.getElementById("modalImagen"),
			);

			modal.hide();
		} catch (error) {
			console.error(error);
		}
	};

	// Editar
	const handleEditarImg = (informacion) => {
		setModoEdicion(true);
		setImageFile(null);

		setInformacionActual({
			id: informacion.id,
			url_imagen: informacion.url_imagen || informacion.url || "",
			orden: informacion.orden ?? 1,
		});
	};

	const handleDrop = (e) => {
		e.preventDefault();

		const file = e.dataTransfer.files[0];

		if (file && file.type.startsWith("image/")) {
			setImageFile(file);
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setImageFile(file);
		}
	};

	const handleRemoveImage = () => {
		setImageFile(null);
		setInformacionActual((prev) => ({
			...prev,
			url_imagen: "",
		}));

		if (inputFileRef.current) {
			inputFileRef.current.value = "";
		}
	};

	const handleUploadImage = async () => {
		if (!imageFile) return null;

		try {
			setUploading(true);

			const response = await uploadProductImage(imageFile);
			const uploadedUrl = response?.url || response?.data?.url || "";

			setInformacionActual((prev) => ({
				...prev,
				url_imagen: uploadedUrl,
			}));

			return response;
		} catch (error) {
			console.error(error);
			alert("No se pudo subir la imagen");
			return null;
		} finally {
			setUploading(false);
		}
	};

	const handleEliminarImg = async () => {
		if (!informacionEliminar) return;

		try {
			await eliminarImagen(informacionEliminar.id);

			await cargarInformacion();

			setImgEliminar(null);

			const modal = window.bootstrap.Modal.getOrCreateInstance(
				document.getElementById("modalEliminarImg"),
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
					<h5 className="mb-0">Imagenes</h5>
					<button
						type="button"
						className="btn btn-dark btn-sm btn__Agregar"
						data-bs-toggle="modal"
						data-bs-target="#modalImagen"
						onClick={handleCrearImg}
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

								<th>Imagen</th>

								<th className="acciones">Opciones</th>
							</tr>
						</thead>

						<tbody>
							{producto.imagenes?.length > 0 ? (
								producto.imagenes.map((info, index) => (
									<tr key={info.id}>
										<td>{info.orden}</td>

										<td>
											<a
												href={info.url_imagen}
												target="_blank"
												rel="noopener noreferrer"
												className="badge bg-primary text-decoration-none"
											>
												{info.url_imagen}
											</a>
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
															data-bs-target="#modalImagen"
															onClick={() => handleEditarImg(info)}
														>
															<BsPencil className="me-2" />
															Editar
														</button>
													</li>

													<li>
														<button
															className="dropdown-item text-danger"
															data-bs-toggle="modal"
															data-bs-target="#modalEliminarImg"
															onClick={() => setImgEliminar(info)}
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
					<div className="modal fade" id="modalImagen" tabIndex="-1">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">
										{modoEdicion ? "Editar Información" : "Agregar Información"}
									</h5>

									<button className="btn-close" data-bs-dismiss="modal" />
								</div>

								<div className="modal-body">
									<label className="form-label">Imagen del producto</label>

									<div
										className={`image-dropzone ${
											imageFile || informacionActual.url_imagen ? "image-dropzone-success" : ""
										}`}
										onDragOver={(e) => e.preventDefault()}
										onDrop={handleDrop}
										onClick={() => inputFileRef.current.click()}
									>
										<input
											ref={inputFileRef}
											type="file"
											accept="image/*"
											hidden
											onChange={handleFileChange}
										/>

										{imageFile ? (
											<p>{imageFile.name}</p>
										) : informacionActual.url_imagen ? (
											<img src={informacionActual.url_imagen} alt="Producto" width="120" />
										) : (
											<p>Arrastra una imagen aquí o haz clic</p>
										)}
									</div>

									<button
										type="button"
										className="btn btn-primary mt-3"
										disabled={!imageFile || uploading}
										onClick={handleUploadImage}
									>
										{uploading ? "Subiendo..." : "Subir imagen"}
									</button>
									<br />
									<br />

									<label className="form-label">Orden</label>
									<input
										type="number"
										min="1"
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

									<button className="btn btn-primary" onClick={handleGuardarImg}>
										{modoEdicion ? "Actualizar" : "Guardar"}
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Modal Eliminar */}
					<div className="modal fade" id="modalEliminarImg" tabIndex="-1">
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

									<button className="btn btn-danger" onClick={handleEliminarImg}>
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

export default TableImage;
