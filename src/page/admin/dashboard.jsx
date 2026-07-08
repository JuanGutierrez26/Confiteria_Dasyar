import { BsBoxArrowRight, BsHouse } from "react-icons/bs";
import "./dashboard.css";

function Dashboard() {
	return (
		<>
			<div className="sidebar d-flex flex-column">
				{/* Logo */}
				<div className="logo px-4 py-4">
					<h3 className="m-0">Dasyar Confiteria</h3>
				</div>

				{/* Menu */}
				<ul className="nav flex-column mt-3">
					<li className="nav-item">
						<a href="/" className="nav-link">
							Dashboard Reports
						</a>
					</li>

					<li className="nav-item active">
						<a href="/" className="nav-link">
							Organizations
						</a>
					</li>
				</ul>

				<div className="mt-auto">
					<div className="logOut">
						<div className="d-flex align-items-center">
							<div className="ms-3">
								<div className=" fw-semibold">Administración</div>

								<small>Cerrar sesión</small>
							</div>

							<BsBoxArrowRight className="ms-auto text-white" size={18} />
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</>
	);
}

export default Dashboard;
