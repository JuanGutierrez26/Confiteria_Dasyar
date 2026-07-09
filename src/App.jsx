import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login/login";
import Home from "./page/Home/home";
import ProductDetail from "./page/ProductoDetalle/ProductDetail";
import NotFound from "./page/NotFound";
import Dashboard from "./page/admin/dashboard";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/admin/dashboard" element={<Dashboard />} />
				</Route>

				{/* Rutas públicas */}
				<Route path="/detalleProducto/:id" element={<ProductDetail />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
