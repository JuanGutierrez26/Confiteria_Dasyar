import { useEffect, useRef, useState } from "react";
import {
	BsThreeDotsVertical,
	BsEye,
	BsTrash,
	BsStarFill,
	BsPencil,
	BsArrowRepeat,
} from "react-icons/bs";
import {
	actualizarProducto,
	crearProducto,
	eliminarProducto,
	obtenerProductosAdmin,
	restaurarProducto,
} from "../../../api/productos/producto";
import { obtenerCategoria } from "../../../api/Categoria/categoria";
import { FaPlus } from "react-icons/fa";
import { uploadProductImage } from "../../../api/upload";

function ProductosAdmin({ onVerProducto }) {
	const [productos, setProductos] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const inputFileRef = useRef(null);
	const [imageFile, setImageFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [productoEliminar, setProductoEliminar] = useState(null);
	const modalRef = useRef(null);
	const [modoEdicion, setModoEdicion] = useState(false);
	const [productoEditar, setProductoEditar] = useState(null);

	useEffect(() => {
		const cargarDatos = async () => {
			try {
				const [productosData, categoriasData] = await Promise.all([
					obtenerProductosAdmin(),
					obtenerCategoria(),
				]);

				setProductos(productosData);
				setCategorias(categoriasData);
			} catch (err) {
				setError("No se pudieron cargar los productos o las categorías.");
			} finally {
				setLoading(false);
			}
		};

		cargarDatos();
	}, []);

	const [product, setProduct] = useState({
		categoria_id: "",
		titulo: "",
		descripcion_corta: "",
		etiqueta: "",
		url_producto: "",
		imagen_principal: "",
		estrellas: "",
		stock: "",
		descripcion_larga: "",
		precio: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProduct((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setProduct({
			categoria_id: "",
			titulo: "",
			descripcion_corta: "",
			etiqueta: "",
			url_producto: "",
			imagen_principal: "",
			estrellas: "",
			stock: "",
			descripcion_larga: "",
			precio: "",
		});
		setImageFile(null);
		setError("");
		if (inputFileRef.current) {
			inputFileRef.current.value = "";
		}
	};

	const closeModal = () => {
		const modalElement = document.getElementById("staticBackdrop");

		const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);

		modal.hide();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (modoEdicion) {
				await actualizarProducto(productoEditar.id, {
					...product,
					categoria_id: Number(product.categoria_id),
					estrellas: Number(product.estrellas),
					stock: Number(product.stock),
					precio: Number(product.precio),
					imagen_principal: String(product.imagen_principal),
				});
			} else {
				await crearProducto({
					...product,
					categoria_id: Number(product.categoria_id),
					estrellas: Number(product.estrellas),
					stock: Number(product.stock),
					precio: Number(product.precio),
				});
			}

			const data = await obtenerProductosAdmin();
			setProductos(data);

			resetForm();
			setModoEdicion(false);
			setProductoEditar(null);

			closeModal();
		} catch (error) {
			console.error(error);
			setError("No se pudo guardar el producto");
		}
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

		setProduct((prev) => ({
			...prev,
			url_producto: "",
			imagen_principal: "",
		}));

		inputFileRef.current.value = "";
	};

	const handleUploadImage = async () => {
		if (!imageFile) return;

		try {
			setUploading(true);

			const response = await uploadProductImage(imageFile);

			setProduct((prev) => ({
				...prev,
				url_producto: response.url,
				imagen_principal: response.url,
			}));
		} catch (error) {
			console.error(error);
			alert("No se pudo subir la imagen");
		} finally {
			setUploading(false);
		}
	};

	const handleEditar = (producto) => {
		setModoEdicion(true);
		setProductoEditar(producto);

		setProduct({
			categoria_id: producto.categoria_id,
			titulo: producto.titulo,
			descripcion_corta: producto.descripcion_corta,
			etiqueta: producto.etiqueta,
			url_producto: producto.url_producto,
			imagen_principal: producto.imagen_principal,
			estrellas: producto.estrellas,
			stock: producto.stock,
			descripcion_larga: producto.descripcion_larga,
			precio: producto.precio,
		});
	};

	const handleEliminar = async () => {
		if (!productoEliminar) return;

		try {
			await eliminarProducto(productoEliminar.id);

			setProductos((prev) =>
				prev.map((p) => (p.id === productoEliminar.id ? { ...p, isActive: false } : p)),
			);

			setProductoEliminar(null);

			const modalElement = document.getElementById("modalEliminar");
			const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);

			modal.hide();
		} catch (error) {
			console.error(error);
		}
	};

	const handleReactivar = async (producto) => {
		try {
			await restaurarProducto(producto.id);

			const data = await obtenerProductosAdmin();
			setProductos(data);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<div>
				<div className="titule__Btn">
					<h3>Productos</h3>
					<button
						type="button"
						className="btn btn-dark btn-sm btn__Agregar"
						data-bs-toggle="modal"
						data-bs-target="#staticBackdrop"
					>
						<FaPlus />
						Agregar
					</button>
				</div>
				<p>Ingrese los productos que van aparecer en el catálogo</p>
			</div>

			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5">
								{modoEdicion ? "Editar Producto" : "Agregar Producto"}
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form id="productoForm" onSubmit={handleSubmit}>
								<div className="row g-3">
									<div className="col-md-6">
										<label className="form-label">Título</label>
										<input
											type="text"
											className="form-control"
											name="titulo"
											value={product.titulo}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="col-md-6">
										<label className="form-label">Categoría</label>
										<select
											className="form-control"
											name="categoria_id"
											value={product.categoria_id}
											onChange={handleChange}
											required
										>
											<option value="">Seleccione una categoría</option>
											{categorias.map((categoria) => (
												<option key={categoria.id} value={categoria.id}>
													{categoria.nombre ||
														categoria.name ||
														categoria.titulo ||
														`Categoría ${categoria.id}`}
												</option>
											))}
										</select>
									</div>

									<div className="col-12">
										<label className="form-label">Descripción corta</label>
										<textarea
											rows="2"
											className="form-control"
											name="descripcion_corta"
											value={product.descripcion_corta}
											onChange={handleChange}
										/>
									</div>

									<div className="col-md-12">
										<label className="form-label">Etiqueta</label>
										<input
											type="text"
											className="form-control"
											name="etiqueta"
											value={product.etiqueta}
											onChange={handleChange}
										/>
									</div>

									<div className="col-md-4">
										<label className="form-label">Estrellas</label>
										<input
											type="number"
											min="0"
											max="5"
											className="form-control"
											name="estrellas"
											value={product.estrellas}
											onChange={handleChange}
										/>
									</div>

									<div className="col-md-4">
										<label className="form-label">Stock</label>
										<input
											type="number"
											className="form-control"
											name="stock"
											value={product.stock}
											onChange={handleChange}
										/>
									</div>

									<div className="col-md-4">
										<label className="form-label">Precio</label>
										<input
											type="number"
											step="0.01"
											className="form-control"
											name="precio"
											value={product.precio}
											onChange={handleChange}
										/>
									</div>

									<div className="col-12">
										<label className="form-label">Descripción larga</label>
										<textarea
											className="form-control"
											rows="5"
											name="descripcion_larga"
											value={product.descripcion_larga}
											onChange={handleChange}
										/>
									</div>

									<div className="col-12">
										<label className="form-label">Imagen del producto</label>

										<div
											className={`image-dropzone ${
												imageFile || product.imagen_principal || product.url_producto
													? "image-dropzone-success"
													: ""
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
											) : product.imagen_principal ? (
												<img src={product.imagen_principal} alt="Producto" width="120" />
											) : (
												<p>Arrastra una imagen aquí o haz clic</p>
											)}
										</div>

										<button
											type="button"
											className="btn btn-primary mt-3"
											disabled={
												(!imageFile && (!product.imagen_principal || !product.url_producto)) ||
												uploading
											}
											onClick={handleUploadImage}
										>
											{uploading ? "Subiendo..." : "Subir imagen"}
										</button>
									</div>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={() => {
									resetForm();
									setModoEdicion(false);
									setProductoEditar(null);
									closeModal();
								}}
							>
								Cancelar
							</button>
							<button type="submit" form="productoForm" className="btn btn-primary">
								{modoEdicion ? "Actualizar Producto" : "Guardar Producto"}
							</button>
						</div>
					</div>
				</div>
			</div>

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
								<td>
									<span className="product-title">{producto.titulo}</span>
								</td>

								<td>
									<span className="badge rounded-pill bg-info text-dark product-tag">
										{producto.etiqueta}
									</span>
								</td>

								<td>
									<span className="price-tag">S/ {Number(producto.precio).toFixed(2)}</span>
								</td>

								<td>
									<div className="stars-container">
										{Array.from({ length: 5 }).map((_, i) => (
											<BsStarFill
												key={i}
												className={i < producto.estrellas ? "star active" : "star"}
											/>
										))}

										<span className="ms-2">{producto.estrellas}/5</span>
									</div>
								</td>

								<td>
									<span
										className={`status-badge ${
											producto.isActive ? "status-active" : "status-inactive"
										}`}
									>
										<span className="status-dot"></span>
										{producto.isActive ? "Activo" : "Inactivo"}
									</span>
								</td>
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
											{producto.isActive ? (
												<>
													<li>
														<button
															className="dropdown-item"
															type="button"
															data-bs-toggle="modal"
															data-bs-target="#staticBackdrop"
															onClick={() => handleEditar(producto)}
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
															data-bs-target="#modalEliminar"
															onClick={() => setProductoEliminar(producto)}
														>
															<BsTrash className="me-2" />
															Eliminar
														</button>
													</li>
												</>
											) : (
												<li>
													<button
														className="dropdown-item text-success"
														type="button"
														onClick={() => handleReactivar(producto)}
													>
														<BsArrowRepeat className="me-2" />
														Reactivar
													</button>
												</li>
											)}
										</ul>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<div
				className="modal fade"
				id="modalEliminar"
				tabIndex={-1}
				aria-labelledby="modalEliminarLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalEliminarLabel">
								Eliminar producto
							</h5>

							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							¿Deseas eliminar el producto <strong>{productoEliminar?.titulo}</strong>?
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
		</>
	);
}

export default ProductosAdmin;
