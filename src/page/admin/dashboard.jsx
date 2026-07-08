import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { limpiarToken } from "../../api/auth";
import { obtenerProducto } from "../../api/productos/producto";
import "./dashboard.css";
import ProductosAdmin from "./components/ProductosAdmin";
import DetalleProducto from "./components/DetalleProducto";

function Dashboard() {
	const navigate = useNavigate();
	const [productoSeleccionado, setProductoSeleccionado] = useState(null);

	const handleLogout = () => {
		limpiarToken();
		navigate("/login", { replace: true });
	};

	const handleVerProducto = async (producto) => {
		try {
			const detalle = await obtenerProducto(producto.id);
			setProductoSeleccionado(detalle);
		} catch (error) {
			console.error("Error al cargar detalle del producto:", error);
			setProductoSeleccionado(producto);
		}
	};

	const handleVolver = () => {
		setProductoSeleccionado(null);
	};

	return (
		<>
			<section className="app">
				<div className="sidebar d-flex flex-column">
					{/* Logo */}
					<div className="px-4 pt-4">
						<h3 className="text-white m-0">Dasyar Confiteria</h3>
					</div>

					{/* Menu */}
					<ul className="nav flex-column mt-3 gap-2">
						<li className="nav-item active">
							<a href="/" className="nav-link">
								Productos
							</a>
						</li>

						<li className="nav-item ">
							<a href="/" className="nav-link">
								Categoria
							</a>
						</li>
					</ul>

					<div className="mt-auto">
						<div className="logOut">
							<div className="d-flex align-items-center btn-Logout" onClick={handleLogout}>
								<div className="">
									<div className=" fw-semibold">Administración</div>

									<small>Cerrar sesión</small>
								</div>

								<BsBoxArrowRight className="ms-auto text-white" size={18} />
							</div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="contentTitle">
						<h2>Administrar Productos</h2>
					</div>
					<main className="contentMain">
						{productoSeleccionado ? (
							<DetalleProducto producto={productoSeleccionado} onVolver={handleVolver} />
						) : (
							<ProductosAdmin onVerProducto={handleVerProducto} />
						)}
					</main>
				</div>
			</section>
		</>
	);
}

export default Dashboard;
