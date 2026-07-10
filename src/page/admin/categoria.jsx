import { useState } from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import TableCategoria from "./components/tablas/TableCategoria";
import { limpiarToken } from "../../api/auth";

function Categoria() {
	const navigate = useNavigate();
	const [productoSeleccionado, setProductoSeleccionado] = useState(null);

	const handleLogout = () => {
		limpiarToken();
		navigate("/login", { replace: true });
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
						<li className="nav-item">
							<Link to="/admin/dashboard" className="nav-link">
								Productos
							</Link>
						</li>

						<li className="nav-item active">
							<Link to="/admin/categoria" className="nav-link">
								Categoría
							</Link>
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
						<h2>Administrar Categoria</h2>
					</div>
					<main className="contentMain">
						<TableCategoria />
					</main>
				</div>
			</section>
		</>
	);
}

export default Categoria;
