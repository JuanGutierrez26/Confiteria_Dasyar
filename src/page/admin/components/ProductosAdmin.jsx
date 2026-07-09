import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical, BsEye, BsTrash } from "react-icons/bs";
import { crearProducto, obtenerProductosAdmin } from "../../../api/productos/producto";
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
		const modal = document.getElementById("staticBackdrop");
		if (modal && window.bootstrap) {
			const modalInstance =
				window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
			modalInstance.hide();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await crearProducto({
				...product,
				categoria_id: Number(product.categoria_id),
				estrellas: Number(product.estrellas),
				stock: Number(product.stock),
				precio: Number(product.precio),
			});

			const data = await obtenerProductosAdmin();
			setProductos(data);
			resetForm();
			closeModal();
		} catch (err) {
			console.error(err);
			setError("No se pudo guardar el producto.");
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

	return (
		<>
			<div>
				<div className="titule__Btn">
					<h3>Productos</h3>
					<button
						type="button"
						class="btn btn-dark btn-sm btn__Agregar"
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
				class="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="staticBackdropLabel">
								Agregar Producto
							</h1>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
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
											className={`image-dropzone ${imageFile ? "image-dropzone-success" : ""}`}
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
												<>
													<p className="mb-2 fw-bold">{imageFile.name}</p>

													<button
														type="button"
														className="btn btn-danger btn-sm"
														onClick={(e) => {
															e.stopPropagation();
															handleRemoveImage();
														}}
													>
														Eliminar imagen
													</button>
												</>
											) : (
												<>
													<i className="bi bi-cloud-arrow-up fs-1"></i>

													<p className="mt-2">Arrastra una imagen aquí o haz clic</p>
												</>
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
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={() => {
									resetForm();
									closeModal();
								}}
							>
								Cancelar
							</button>
							<button type="submit" form="productoForm" class="btn btn-primary">
								Guardar Producto
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
