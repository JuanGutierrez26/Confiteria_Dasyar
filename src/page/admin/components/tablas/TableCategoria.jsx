import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical, BsPencil, BsTrash } from "react-icons/bs";
import {
	actualizarCategoria,
	crearCategoria,
	eliminarCategoria,
	obtenerCategoria,
} from "../../../../api/Categoria/categoria";

function TableCategoria() {
	const [categorias, setCategorias] = useState([]);
	const [modoEdicion, setModoEdicion] = useState(false);
	const [categoriaEditar, setCategoriaEditar] = useState(null);
	const [categoriaEliminar, setCategoriaEliminar] = useState(null);
	const [nombre, setNombre] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const cargarCategorias = async () => {
			try {
				const data = await obtenerCategoria();
				setCategorias(data);
			} catch (err) {
				console.error(err);
				setError("No se pudieron cargar las categorías.");
			} finally {
				setLoading(false);
			}
		};

		cargarCategorias();
	}, []);

	const resetForm = () => {
		setNombre("");
		setModoEdicion(false);
		setCategoriaEditar(null);
		setError("");
	};

	const closeModal = () => {
		const modalElement = document.getElementById("staticBackdrop");
		if (!modalElement) return;

		const modal = window.bootstrap?.Modal?.getOrCreateInstance(modalElement);
		modal?.hide();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nombre.trim()) {
			setError("El nombre de la categoría es obligatorio.");
			return;
		}

		try {
			if (modoEdicion && categoriaEditar) {
				await actualizarCategoria(categoriaEditar.id, { nombre: nombre.trim() });
				setCategorias((prev) =>
					prev.map((cat) =>
						cat.id === categoriaEditar.id ? { ...cat, nombre: nombre.trim() } : cat,
					),
				);
			} else {
				const nuevaCategoria = await crearCategoria({ nombre: nombre.trim() });
				setCategorias((prev) => [...prev, nuevaCategoria]);
			}

			resetForm();
			closeModal();
		} catch (err) {
			console.error(err);
			setError("No se pudo guardar la categoría.");
		}
	};

	const handleEditar = (categoria) => {
		setModoEdicion(true);
		setCategoriaEditar(categoria);
		setNombre(categoria.nombre || "");
		setError("");
	};

	const handleEliminar = async () => {
		if (!categoriaEliminar) return;

		try {
			await eliminarCategoria(categoriaEliminar.id);
			setCategorias((prev) => prev.filter((cat) => cat.id !== categoriaEliminar.id));
			setCategoriaEliminar(null);

			const modalElement = document.getElementById("modalEliminar");
			if (modalElement) {
				const modal = window.bootstrap?.Modal?.getOrCreateInstance(modalElement);
				modal?.hide();
			}
		} catch (err) {
			console.error(err);
			setError("No se pudo eliminar la categoría.");
		}
	};

	return (
		<section>
			<div>
				<div className="titule__Btn">
					<h3>Categorías</h3>
					<button
						type="button"
						className="btn btn-dark btn-sm btn__Agregar"
						data-bs-toggle="modal"
						data-bs-target="#staticBackdrop"
						onClick={resetForm}
					>
						<FaPlus />
						Agregar
					</button>
				</div>
				<p>Ingrese las categorías</p>
			</div>

			{error && <div className="alert alert-danger py-2">{error}</div>}

			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5">
								{modoEdicion ? "Editar categoría" : "Agregar categoría"}
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form id="categoriaForm" onSubmit={handleSubmit}>
								<div className="row g-3">
									<div className="col-md-12">
										<label className="form-label">Nombre</label>
										<input
											type="text"
											className="form-control"
											name="nombre"
											value={nombre}
											onChange={(e) => setNombre(e.target.value)}
											required
										/>
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
									closeModal();
								}}
							>
								Cancelar
							</button>
							<button type="submit" form="categoriaForm" className="btn btn-primary">
								{modoEdicion ? "Actualizar categoría" : "Guardar categoría"}
							</button>
						</div>
					</div>
				</div>
			</div>

			{loading ? (
				<p>Cargando categorías...</p>
			) : (
				<table className="table table-striped">
					<thead>
						<tr className="table-dark">
							<th scope="col">#</th>
							<th scope="col">Nombre</th>
							<th scope="col" className="acciones">
								Opciones
							</th>
						</tr>
					</thead>
					<tbody>
						{categorias.length > 0 ? (
							categorias.map((categoria, index) => (
								<tr key={categoria.id || index}>
									<th scope="row">{index + 1}</th>
									<td>
										<span className="product-title">
											{categoria.nombre || categoria.titulo || `Categoría ${categoria.id}`}
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
														data-bs-toggle="modal"
														data-bs-target="#staticBackdrop"
														onClick={() => handleEditar(categoria)}
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
														onClick={() => setCategoriaEliminar(categoria)}
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
								<td colSpan="3" className="text-center py-3">
									No hay categorías registradas.
								</td>
							</tr>
						)}
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
								Eliminar categoría
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							¿Deseas eliminar la categoría{" "}
							<strong>{categoriaEliminar?.nombre || "esta categoría"}</strong>?
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
		</section>
	);
}

export default TableCategoria;
