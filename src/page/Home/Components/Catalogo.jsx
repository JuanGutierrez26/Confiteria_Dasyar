import { FaSearch } from "react-icons/fa";
import { obtenerCategoria } from "../../../api/Categoria/categoria";
import { obtenerProductos } from "../../../api/productos/producto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Catalogo() {
	const navigate = useNavigate();
	const [productos, setProductos] = useState([]);
	const [categoria, setCategoria] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const cargarProductos = async (search = "", category = "") => {
		setIsLoading(true);
		try {
			const data = await obtenerProductos(search, category);
			setProductos(data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const cargarCategorias = async () => {
			try {
				const data = await obtenerCategoria();
				setCategoria(data);
			} catch (error) {
				console.error(error);
			}
		};

		cargarCategorias();
		cargarProductos();
	}, []);

	const handleSearchSubmit = async (event) => {
		event.preventDefault();
		await cargarProductos(searchTerm.trim(), selectedCategory);
	};

	return (
		<>
			<section>
				<div className="catalogoSection">
					<h2>Catalogo</h2>
					<div className="inputCatalogo">
						<form className="input-group mb-3" onSubmit={handleSearchSubmit}>
							<span
								className="input-group-text"
								id="basic-addon1"
								onClick={handleSearchSubmit}
								style={{ cursor: "pointer" }}
							>
								<FaSearch />
							</span>
							<input
								type="text"
								className="form-control"
								placeholder="Buscar productos..."
								aria-label="Buscar productos"
								aria-describedby="basic-addon1"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</form>

						<select
							className="form-select"
							value={selectedCategory}
							onChange={async (e) => {
								const newCategory = e.target.value;
								setSelectedCategory(newCategory);
								await cargarProductos(searchTerm.trim(), newCategory);
							}}
						>
							<option value="">Todas las categorías</option>
							{categoria.map((cat) => (
								<option key={cat.id} value={cat.nombre}>
									{cat.nombre}
								</option>
							))}
						</select>
					</div>
				</div>
				{/*  */}
				<div className="container ">
					{isLoading ? (
						<div className="productosContainer">
							{[...Array(6)].map((_, index) => (
								<div key={index} className="card cardProducto">
									<div className="placeholder-glow">
										<div className="imgProducto placeholder" style={{ height: "200px" }}></div>
									</div>
									<div className="card-body bodyProducto">
										<h5 className="card-title placeholder-glow">
											<span className="placeholder col-6"></span>
										</h5>
										<p className="card-text placeholder-glow">
											<span className="placeholder col-7"></span>
											<span className="placeholder col-4"></span>
										</p>
									</div>
								</div>
							))}
						</div>
					) : productos.length === 0 ? (
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ minHeight: "300px", width: "100%" }}
						>
							<div className="text-center">
								<h3>No se encontraron productos</h3>
								<p>Intentelo más tarde</p>
							</div>
						</div>
					) : (
						<div className="productosContainer">
							{productos.map((producto) => (
								<div
									key={producto.id}
									className="card cardProducto"
									onClick={() => navigate(`/detalleProducto/${producto.id}`)}
									style={{ cursor: "pointer" }}
								>
									<img
										src={producto.url_producto || "placeholder.jpg"}
										className="imgProducto"
										alt={producto.titulo}
									/>
									<div className="card-body bodyProducto">
										<h5 className="card-title">{producto.titulo}</h5>
										<p className="card-text">{producto.descripcion_corta}</p>
										{producto.etiqueta && (
											<span className="badge bg-black">{producto.etiqueta}</span>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}

export default Catalogo;
