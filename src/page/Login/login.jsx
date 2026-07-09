import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login as iniciarSesion } from "../../api/auth";

function Login() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		try {
			const respuesta = await iniciarSesion({
				usuario: formData.email,
				password: formData.password,
			});

			if (respuesta?.token) {
				navigate("/admin/dashboard");
			} else {
				setError(respuesta?.message || "No se recibió un token válido.");
			}
		} catch (err) {
			setError(err?.response?.data?.message || "No se pudo iniciar sesión.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-container">
			{/* Panel izquierdo */}
			<div className="login-left">
				<div className="logo">
					<h2>Confiteria Dasyar</h2>
				</div>

				<div className="login-form-container">
					<h1>Bienvenido</h1>

					<p className="subtitle">
						Ingrese su correo electrónico y contraseña para acceder a su cuenta.
					</p>

					<form className="login-form" onSubmit={handleSubmit}>
						<div className="form-group">
							<label>Email</label>
							<input
								type="input"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="confiteria@dasyar.com"
								required
							/>
						</div>

						<div className="form-group">
							<label>Contraseña</label>

							<div className="position-relative">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									className="form-control pe-5"
									value={formData.password}
									onChange={handleChange}
									placeholder="••••••••"
									required
								/>

								<button
									type="button"
									className="btn border-0 position-absolute top-50 end-0 translate-middle-y me-3 p-0"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
						</div>

						<div className="options">
							<label className="remember">
								<input type="checkbox" />
								Recordarme
							</label>
						</div>

						{error ? <p className="text-danger">{error}</p> : null}

						<button type="submit" className="btn-login" disabled={loading}>
							{loading ? "Ingresando..." : "Iniciar Sesión"}
						</button>
					</form>
				</div>

				<div className="footerLogin">
					<span>Copyright © 2026 Confiteria Dasyar</span>
				</div>
			</div>

			{/* Panel derecho */}
			<div className="login-right">
				<div className="overlay">
					<h2>Administra tu catálogo de productos fácilmente.</h2>

					<p>
						Organiza dulces, chocolates, bebidas y promociones desde un solo lugar. Mantén tu
						catálogo siempre actualizado y listo para tus clientes.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
